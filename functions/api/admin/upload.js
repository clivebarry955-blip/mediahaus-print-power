import {
  commitFile,
  jsonResponse,
  sanitizeFileName,
  requireAdminEnabled,
  requireAdminSecret,
} from "../../_utils/github";

export const onRequestPost = async ({ request, env }) => {
  try {
    requireAdminEnabled(env);
    requireAdminSecret(request, env);
    const payload = await request.json();
    const name = sanitizeFileName(payload?.fileName ?? "");
    const data = payload?.data;
    if (!name || typeof data !== "string") {
      return jsonResponse(400, { error: "Missing file data" });
    }
    const path = `public/media/${name}`;
    await commitFile(env, path, data, `chore: upload media ${name} via admin`);
    return jsonResponse(200, { status: "ok", src: `/media/${name}` });
  } catch (error) {
    console.error("[admin-upload]", error);
    return jsonResponse(500, { error: error instanceof Error ? error.message : String(error) });
  }
};
