import { getAdminSecret, isAdminEnabled, jsonResponse } from "../../_utils/github";

export const onRequestGet = ({ env }) => {
  return jsonResponse(200, {
    enabled: isAdminEnabled(env),
    requiresPassword: Boolean(getAdminSecret(env)),
  });
};

export const onRequestPost = async ({ request, env }) => {
  if (!isAdminEnabled(env)) {
    return jsonResponse(403, { error: "Admin disabled" });
  }

  const configuredSecret = getAdminSecret(env);
  if (!configuredSecret) {
    return jsonResponse(200, { authenticated: true });
  }

  const headerSecret = request.headers.get("x-admin-secret") ?? "";
  if (headerSecret === configuredSecret) {
    return jsonResponse(200, { authenticated: true });
  }

  try {
    const payload = await request.json();
    if (payload?.password === configuredSecret) {
      return jsonResponse(200, { authenticated: true });
    }
  } catch {
    // ignore parse errors
  }

  return jsonResponse(401, { error: "Invalid password" });
};
