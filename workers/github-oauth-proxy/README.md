# GitHub OAuth proxy — enabling "Sign in with GitHub"

The Contribute editor's **Sign in with GitHub** button stays disabled until two
env vars are set on the site build:

- `GITHUB_OAUTH_CLIENT_ID` — your OAuth App's Client ID
- `GITHUB_OAUTH_PROXY_URL` — the deployed URL of this worker

A static site can't sign users in with GitHub on its own: the OAuth flow needs
the App's **client secret** (which must never ship to the browser) and GitHub's
device endpoints don't send CORS headers. This worker handles both.

## One-time setup (~10 min)

### 1. Register a GitHub OAuth App
GitHub → Settings → Developer settings → **OAuth Apps** → **New OAuth App**:

- **Homepage URL:** `https://afriannotate.github.io`
- **Authorization callback URL:** `https://afriannotate.github.io/oauth-callback`
- Tick **Enable Device Flow** (optional, used as a popup-blocked fallback).

Copy the **Client ID**, then **Generate a new client secret** and copy it too.

### 2. Deploy this worker (Cloudflare, free tier)
```bash
cd workers/github-oauth-proxy
npx wrangler login
# put the Client ID + your site origin into wrangler.toml [vars] first, then:
npx wrangler secret put GITHUB_CLIENT_SECRET   # paste the secret when prompted
npx wrangler deploy
```
Note the deployed URL, e.g. `https://afriplaybook-github-oauth.<you>.workers.dev`.

### 3. Point the site at it — nothing sensitive in the repo

**For the deployed site (GitHub Actions):** add two **repository secrets** at
Settings → Secrets and variables → Actions. Note GitHub forbids secret names
starting with `GITHUB_`, so they're named without that prefix; the workflow
already maps them to the env vars the site expects:

| Secret name        | Value                                              |
|--------------------|----------------------------------------------------|
| `OAUTH_CLIENT_ID`  | the OAuth App Client ID                            |
| `OAUTH_PROXY_URL`  | `https://afriplaybook-github-oauth.<you>.workers.dev` |

The **client secret never goes here** — it lives only on the worker
(`wrangler secret put GITHUB_CLIENT_SECRET`). The Client ID and proxy URL are
public by nature (the browser must call them), so this is safe; they just stay
out of the committed source.

**For local testing:** put the same two values in `.env.local` (git-ignored).

Rebuild / redeploy. The button is now live — each user authorises on github.com
and never types anything into our page.

## Endpoints (for reference)
| Method | Path            | Body                                   | Returns                |
|--------|-----------------|----------------------------------------|------------------------|
| POST   | `/`             | `{ code }`                             | `{ access_token }`     |
| POST   | `/device-code`  | `{ client_id, scope }`                 | `{ device_code, … }`   |
| POST   | `/device-token` | `{ client_id, device_code, grant_type}`| `{ access_token｜error }`|
