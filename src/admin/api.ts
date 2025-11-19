import type { ContentFile } from "@/utils/content";

let adminSecret: string | null = null;

export const setAdminSecret = (secret: string | null) => {
  adminSecret = secret;
};

const postJson = async (url: string, payload: unknown, options?: { includeSecret?: boolean }) => {
  const includeSecret = options?.includeSecret ?? true;
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (includeSecret && adminSecret) {
    headers["x-admin-secret"] = adminSecret;
  }
  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(payload ?? {}),
  });

  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Request failed");
  }

  try {
    return await response.json();
  } catch {
    return {};
  }
};

export const fetchAdminConfig = async () => {
  const response = await fetch("/api/admin/config", { method: "GET" });
  if (!response.ok) {
    const message = await response.text();
    throw new Error(message || "Failed to load admin config");
  }
  return response.json();
};

export const verifyAdminPassword = (password?: string) => {
  if (typeof password === "string") {
    return postJson("/api/admin/config", { password }, { includeSecret: false });
  }
  return postJson("/api/admin/config", {}, { includeSecret: true });
};

export const saveContent = (file: ContentFile, payload: unknown) =>
  postJson("/api/admin/content", { file, payload });

const toBase64 = async (file: File) => {
  const buffer = await file.arrayBuffer();
  let binary = "";
  const bytes = new Uint8Array(buffer);
  const { length } = bytes;
  for (let i = 0; i < length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const normalizeFileName = (name: string) => name.replace(/[^a-zA-Z0-9._-]/g, "-");

export const uploadMediaFile = async (file: File) => {
  const data = await toBase64(file);
  return postJson("/api/admin/upload", {
    fileName: normalizeFileName(file.name),
    data,
  });
};
