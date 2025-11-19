export const onRequestGet = async ({ env }) => {
  const payload = {
    VITE_ADMIN_ENABLED: env.VITE_ADMIN_ENABLED ?? null,
    GITHUB_REPO: env.GITHUB_REPO ?? null,
    GITHUB_BRANCH: env.GITHUB_BRANCH ?? null,
    hasToken: Boolean(env.GITHUB_TOKEN || env.GITHUB_API_TOKEN || env.GITHUB_ADMIN_TOKEN),
  };
  return new Response(JSON.stringify(payload, null, 2), {
    headers: { "Content-Type": "application/json" },
  });
};
