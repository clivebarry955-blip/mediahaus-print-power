# Mediahaus Print Power

A Vite + React + TypeScript stack powered by Tailwind CSS and shadcn-ui. The UI is now fully content-driven so non-technical editors can change fonts, copy, and imagery without touching components.

## Development Quick Start

```sh
npm install
npm run dev
```

Key scripts:

- `npm run dev` – Vite dev server with hot content reloads
- `npm run content:check` – validates `/content` JSON files against the schema
- `npm run content:extract` – scans the codebase for missing or unused copy keys
- `npm run build` / `npm run preview` – production bundle + local preview

## Content System Overview

All user-editable data lives under `/content`:

| File | Purpose |
| --- | --- |
| `content/site.json` | Brand name, navigation links, social URLs, font tokens, media assignments, and theme values. |
| `content/copy.json` | All textual strings keyed by semantic IDs (e.g. `hero.title`, `cta.primary`). |
| `content/media.json` | Media asset registry that stores IDs, file paths or remote URLs, and optional `altKey`s. |

Hot-reload aware hooks/components:

- `useSiteConfig()` – access brand + navigation + theme tokens
- `useCopy()` – returns `{ t, copy, keys }`; call `t('hero.title')` or render `<Text id="hero.title" />`
- `useMedia()` – resolves `SmartImage` props, alt text, and asset descriptions
- `<Text id="copy.key" markdown />` – renders copy with optional Markdown support
- `<SmartImage id="media.asset" sizes="(min-width: 768px) 50vw, 100vw" />` – lazy-loaded responsive images with automatic alt text
- `FontsManager` – applies Google/local fonts via CSS variables so Tailwind utilities `font-primary`, `font-secondary`, and `font-heading` always reflect `site.json`

### Using Copy & Media in Components

```tsx
import Text from "@/components/Text";
import SmartImage from "@/components/SmartImage";

<Text as="h2" id="hero.title" className="text-4xl font-heading" />
<SmartImage id="hero.primary" className="rounded-xl" sizes="(min-width: 1024px) 45vw, 90vw" />
```

If a copy key is missing, the UI shows `{{key}}` and `npm run content:extract` will fail to remind you to add it to `content/copy.json`.

## Managing Fonts

Fonts are defined in `content/site.json` and automatically exposed to Tailwind via CSS variables:

```json
"fonts": {
  "primary": {
    "name": "Inter",
    "stack": "\"Inter\", -apple-system, BlinkMacSystemFont, \"Segoe UI\", sans-serif",
    "importUrl": "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap"
  },
  "secondary": {
    "name": "EB Garamond",
    "stack": "\"EB Garamond\", Georgia, 'Times New Roman', serif",
    "importUrl": "https://fonts.googleapis.com/css2?family=EB+Garamond:wght@400;500;600&display=swap"
  }
}
```

- Google Fonts: use the embed URL with `display=swap` and FontsManager will inject the `<link>` tag.
- Local fonts: point `importUrl` to a CSS file that defines `@font-face` rules (e.g. `/fonts/theme.css`).
- Tailwind classes `font-primary`, `font-secondary`, and `font-heading` point to these stacks, so simply apply them to headings/body copy.

### Troubleshooting Google Fonts

1. Make sure the URL is reachable from `npm run dev` (no authentication headers).
2. Confirm the family name in `stack` exactly matches the CSS font-family.
3. If fonts do not change, delete your browser cache and ensure the ADMIN panel saved `site.json` (run `npm run content:check`).

## Media Management

- Place local demo assets in `/public/media`. Three examples are already provided (`logo-light.png`, `hero-press.jpg`, `cta-team.jpg`, `features-rolls.jpg`).
- Remote URLs (e.g. Unsplash) are supported; just set the `src` field to the absolute URL in `media.json`.
- `<SmartImage>` automatically lazy-loads, reads alt text from the `altKey` (which resolves via `copy.json`), and falls back to a placeholder if an ID is missing.

## Admin Panel (Local + Production)

The `/admin` editor now commits directly to this GitHub repo so Cloudflare Pages can redeploy with the updated JSON/media files.

### One-time GitHub setup

1. Create a classic GitHub personal access token with the `repo` scope (read/write).
2. In Cloudflare Pages → **Settings → Environment variables**, add:
   - `VITE_ADMIN_ENABLED=true`
   - `VITE_ADMIN_PASSWORD=<optional gate>`
   - `GITHUB_REPO=owner/repo` (e.g. `Camo67/mediahaus-print-power`)
   - `GITHUB_BRANCH=main` (or your default branch)
   - `GITHUB_TOKEN=<the PAT from step 1>` (store as a Secret)
3. Deploy as usual (`npm run build && wrangler pages deploy dist`). Every save from `/admin` commits to GitHub, which triggers a fresh Pages build automatically.

### Local workflow

- The Vite dev server still writes straight to `/content` and `/public/media` via the built-in middleware, so you can iterate offline with no GitHub calls.
- Production (Pages) traffic hits the Cloudflare Function under `/api/admin/*`, which performs the GitHub commits securely with the token you provided.

### Using the editor

- Fonts tab: adjust families, Google Font URLs, and base sizes.
- Copy tab: edit every copy key inline with instant filtering.
- Media tab: tweak sources/alt text and upload images (stored under `public/media` so Vite bundles them on the next deploy).

Once a change is saved, a commit is pushed to the repo. Pages detects the commit and rebuilds, so production updates automatically within a couple of minutes.

## Deployment (Cloudflare Pages)

1. Build locally: `npm run build`
2. Preview locally: `npm run preview`
3. Authenticate: `cloudflare login`
4. Deploy: `wrangler pages deploy dist`

`wrangler.toml` already points Pages at the `dist` directory. All assets under `/public` (including `/public/media`) are copied during the Vite build so Pages serves them alongside the bundled React app.

## Editing Workflow Checklist

1. Update copy/images/fonts via `/content` files or the `/admin` UI.
2. Run `npm run content:check` to validate JSON.
3. Run `npm run content:extract` to ensure every copy key is defined.
4. Commit changes, then `npm run build && npm run preview` to verify before `wrangler pages deploy dist`.

Happy publishing! EOF
