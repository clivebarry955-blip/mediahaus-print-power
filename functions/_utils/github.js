const API_BASE = "https://api.github.com";

const encodePath = (path) =>
  path
    .split("/")
    .map((segment) => encodeURIComponent(segment))
    .join("/");

const encoder = new TextEncoder();

const stringToBase64 = (value) => {
  const bytes = encoder.encode(value);
  let binary = "";
  for (let i = 0; i < bytes.length; i += 1) {
    binary += String.fromCharCode(bytes[i]);
  }
  return btoa(binary);
};

const toBoolean = (value) => {
  if (typeof value === "string") return value.toLowerCase() === "true";
  return Boolean(value);
};

export const isAdminEnabled = (env) => {
  const explicit = env.VITE_ADMIN_ENABLED ?? env.ADMIN_ENABLED;
  if (explicit !== undefined) {
    return toBoolean(explicit);
  }
  return Boolean(env.VITE_ADMIN_PASSWORD ?? env.ADMIN_PASSWORD);
};

export const getAdminSecret = (env) => env.VITE_ADMIN_PASSWORD ?? env.ADMIN_PASSWORD ?? "";

export const requireAdminEnabled = (env) => {
  if (!isAdminEnabled(env)) {
    const error = new Error("Admin disabled");
    error.status = 403;
    throw error;
  }
};

export const requireAdminSecret = (request, env) => {
  const configuredSecret = getAdminSecret(env);
  if (!configuredSecret) return;
  const providedSecret = request.headers.get("x-admin-secret") ?? "";
  if (providedSecret !== configuredSecret) {
    const error = new Error("Unauthorized");
    error.status = 401;
    throw error;
  }
};

const ensureGithubConfig = (env) => {
  const token = env.GITHUB_TOKEN || env.GITHUB_API_TOKEN || env.GITHUB_ADMIN_TOKEN;
  const repo = env.GITHUB_REPO;
  if (!token || !repo) {
    throw new Error("Missing GITHUB_TOKEN or GITHUB_REPO env vars");
  }
  const branch = env.GITHUB_BRANCH || "main";
  return { token, repo, branch };
};

const buildHeaders = (token) => ({
  Authorization: `Bearer ${token}`,
  "Content-Type": "application/json",
  "User-Agent": "mediahaus-admin",
  Accept: "application/vnd.github+json",
});

const fetchExistingSha = async (headers, repo, path, branch) => {
  const url = `${API_BASE}/repos/${repo}/contents/${encodePath(path)}?ref=${encodeURIComponent(branch)}`;
  const response = await fetch(url, { headers });
  if (response.status === 404) {
    return undefined;
  }
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Failed to read ${path}: ${response.status} ${text}`);
  }
  const payload = await response.json();
  return payload?.sha;
};

export const commitFile = async (env, path, base64Content, message) => {
  const { token, repo, branch } = ensureGithubConfig(env);
  const headers = buildHeaders(token);
  const sha = await fetchExistingSha(headers, repo, path, branch);
  const url = `${API_BASE}/repos/${repo}/contents/${encodePath(path)}`;
  const body = {
    message,
    content: base64Content,
    branch,
  };
  if (sha) body.sha = sha;

  const response = await fetch(url, {
    method: "PUT",
    headers,
    body: JSON.stringify(body),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`GitHub commit failed (${response.status}): ${text}`);
  }

  return response.json();
};

export const encodeText = (value) => stringToBase64(value);

export const jsonResponse = (status, payload) =>
  new Response(JSON.stringify(payload), {
    status,
    headers: {
      "Content-Type": "application/json",
    },
  });

export const sanitizeFileName = (name) => name.replace(/[^a-zA-Z0-9._-]/g, "-") || "asset";
