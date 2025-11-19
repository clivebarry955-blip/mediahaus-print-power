import { commitFile, encodeText, jsonResponse, requireAdminEnabled, requireAdminSecret } from "../../_utils/github";

const allowedFiles = new Set(["site", "copy", "media", "products"]);

export const onRequestPost = async ({ request, env }) => {
  try {
    requireAdminEnabled(env);
    const payload = await request.json();
    requireAdminSecret(request, env);
    if (!allowedFiles.has(payload?.file)) {
      return jsonResponse(400, { error: "Invalid file" });
    }
    const path = `content/${payload.file}.json`;
    const pretty = `${JSON.stringify(payload.payload ?? {}, null, 2)}\n`;
    await commitFile(env, path, encodeText(pretty), `chore: update ${payload.file}.json via admin`);
    return jsonResponse(200, { status: "ok" });
  } catch (error) {
    console.error("[admin-content]", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : String(error) });
  }
};
