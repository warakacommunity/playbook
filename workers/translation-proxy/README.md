# Translation proxy worker

Backs the model-based **Auto-translate** button in the AfriPlaybook "Contribute"
editor (`src/components/StructureEditor/index.jsx`). The button only renders when
the site is built with `TRANSLATION_PROXY_URL` pointing at this worker — otherwise
the editor shows only the client-side Google Translate button.

## Contract

```
POST /  { "text": "...", "tgt_lang": "am" }
  200   [ { "translation_text": "..." } ]
  4xx/5xx { "error": "..." }
```

## Engines

- **Primary — Cloudflare Workers AI** (`@cf/meta/m2m100-1.2b`). On-platform, no
  API key, no shared-IP rate limits. Covers 12 languages:
  `am ar de es fr ha ig pt so sw yo zu` (one retry on transient empty/error).
- **Fallback — MyMemory** for `om` (Oromo) and `rw` (Kinyarwanda), which m2m100
  doesn't support, and if Workers AI errors. Note: Cloudflare's shared egress
  IPs are frequently blocked by MyMemory's anonymous quota even with
  `MYMEMORY_EMAIL` set, so `om`/`rw` can be unavailable — there is no on-platform
  model for them yet.

## Config (`wrangler.toml`)

- `[ai] binding = "AI"` — Workers AI binding (required).
- `ALLOWED_ORIGIN` — CORS allowlist (comma-separated; localhost always allowed).
- `MYMEMORY_EMAIL` — re-keys the MyMemory fallback quota to 50k words/day.

## Deploy

```
cd workers/translation-proxy
wrangler deploy
```

The deployed URL must be set as the `TRANSLATION_PROXY_URL` GitHub Actions secret
on `warakacommunity/playbook` (mapped to the build env in
`.github/workflows/deploy.yml`), so the Pages build embeds it. Current URL:
`https://afriplaybook-translate.afriplaybook-masakhane.workers.dev`
