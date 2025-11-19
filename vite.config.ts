import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs/promises";
import { componentTagger } from "lovable-tagger";
import { getAdminSecret, isAdminEnabled } from "./functions/_utils/github.js";

const readBody = async (req: any) =>
  await new Promise<string>((resolve, reject) => {
    let data = "";
    req.on("data", (chunk: Buffer) => {
      data += chunk;
    });
    req.on("end", () => resolve(data));
    req.on("error", reject);
  });

const contentWriterPlugin = ({ enabled, adminPassword }: { enabled: boolean; adminPassword: string }) => ({
  name: "content-admin-writer",
  configureServer(server: any) {
    server.middlewares.use(async (req: any, res: any, next: any) => {
      if (!req.url?.startsWith("/__content/") && !req.url?.startsWith("/api/admin/")) return next();

      if (req.url === "/api/admin/config") {
        if (req.method === "GET") {
          res.end(
            JSON.stringify({
              enabled,
              requiresPassword: Boolean(adminPassword),
            }),
          );
          return;
        }
        if (req.method === "POST") {
          if (!enabled) {
            res.statusCode = 403;
            res.end("Admin disabled");
            return;
          }
          if (!adminPassword) {
            res.end(JSON.stringify({ authenticated: true }));
            return;
          }
          if ((req.headers["x-admin-secret"] as string | undefined) === adminPassword) {
            res.end(JSON.stringify({ authenticated: true }));
            return;
          }
          const raw = await readBody(req);
          try {
            const payload = raw ? JSON.parse(raw) : {};
            if (payload.password === adminPassword) {
              res.end(JSON.stringify({ authenticated: true }));
              return;
            }
          } catch {
            // ignore
          }
          res.statusCode = 401;
          res.end("Invalid password");
          return;
        }
        res.statusCode = 405;
        res.end("Method not allowed");
        return;
      }

      if (req.method !== "POST") {
        res.statusCode = 405;
        res.end("Method not allowed");
        return;
      }

      if (!enabled) {
        res.statusCode = 403;
        res.end("Admin disabled");
        return;
      }

      const requireSecret = () => {
        if (!adminPassword) return true;
        if ((req.headers["x-admin-secret"] as string | undefined) === adminPassword) {
          return true;
        }
        res.statusCode = 401;
        res.end("Unauthorized");
        return false;
      };

      try {
        const raw = await readBody(req);
        const payload = raw ? JSON.parse(raw) : {};
          if (req.url === "/__content/write" || req.url === "/api/admin/content") {
            if (!requireSecret()) return;
            const allowed = new Set(["site", "copy", "media", "products"]);
          if (!allowed.has(payload.file)) {
            res.statusCode = 400;
            res.end("Invalid file");
            return;
          }
          const target = path.resolve(process.cwd(), "content", `${payload.file}.json`);
          await fs.writeFile(target, `${JSON.stringify(payload.payload, null, 2)}\n`);
          server.ws.send({ type: "full-reload" });
          res.end(JSON.stringify({ status: "ok" }));
          return;
        }

        if (req.url === "/__content/upload" || req.url === "/api/admin/upload") {
          if (!requireSecret()) return;
          const fileName = typeof payload.fileName === "string" ? payload.fileName : "asset";
          const sanitized = fileName.replace(/[^a-zA-Z0-9._-]/g, "-") || "asset";
          const buffer = Buffer.from(payload.data ?? "", "base64");
          const targetDir = path.resolve(process.cwd(), "public", "media");
          await fs.mkdir(targetDir, { recursive: true });
          const dest = path.resolve(targetDir, sanitized);
          await fs.writeFile(dest, buffer);
          res.end(JSON.stringify({ status: "ok", src: `/media/${sanitized}` }));
          return;
        }

        res.statusCode = 404;
        res.end("Unknown admin endpoint");
      } catch (error) {
        console.error("[content-admin]", error);
        res.statusCode = 500;
        res.end("Failed to persist content");
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  const adminEnabled = isAdminEnabled(env);
  const adminPassword = getAdminSecret(env);
  return {
    base: "./",
    server: {
      host: "::",
      port: 8080,
    },
    build: {
      outDir: "dist",
      assetsDir: "assets",
      rollupOptions: {
        output: {
          manualChunks: undefined,
        },
      },
    },
    plugins: [
      react(),
      mode === "development" && componentTagger(),
      contentWriterPlugin({ enabled: adminEnabled, adminPassword }),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
