// GitHub OAuth proxy for the AfriPlaybook "Contribute" editor.
//
// A static site can't sign users in with GitHub on its own: the OAuth web flow
// needs the App's client_secret (which must never ship in browser code), and
// GitHub's device endpoints don't send CORS headers. This tiny worker solves
// both — it keeps the secret server-side and adds CORS.
//
// Endpoints (all POST, JSON):
//   /              { code }                              -> { access_token }      popup web flow
//   /device-code   { client_id, scope }                 -> { device_code, ... }   device flow start
//   /device-token  { client_id, device_code, grant_type}-> { access_token|error } device flow poll
//
// Config (Cloudflare → Settings → Variables):
//   GITHUB_CLIENT_ID      (var)     the OAuth App's Client ID
//   GITHUB_CLIENT_SECRET  (secret)  the OAuth App's Client Secret — `wrangler secret put`
//   ALLOWED_ORIGIN        (var)     e.g. https://afriannotate.github.io  ("*" only for testing)

const GH = 'https://github.com/login';

// Allow the request's origin if it's localhost (dev) or in ALLOWED_ORIGIN
// (comma-separated list, or "*"). The proxy uses no cookies, so echoing the
// origin is safe.
function resolveOrigin(request, env) {
  const reqOrigin = request.headers.get('Origin') || '';
  const allowed = (env.ALLOWED_ORIGIN || '*').split(',').map((s) => s.trim());
  if (allowed.includes('*')) return reqOrigin || '*';
  if (allowed.includes(reqOrigin)) return reqOrigin;
  if (/^http:\/\/localhost(:\d+)?$/.test(reqOrigin)) return reqOrigin;
  return allowed[0] || '*';
}

function corsHeaders(origin) {
  return {
    'Access-Control-Allow-Origin': origin || '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Max-Age': '86400',
  };
}

async function ghPost(path, body) {
  const res = await fetch(`${GH}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default {
  async fetch(request, env) {
    const allow = env.ALLOWED_ORIGIN || '*';
    const cors = corsHeaders(allow);
    const json = { ...cors, 'Content-Type': 'application/json' };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: json });
    }

    const { pathname } = new URL(request.url);
    const body = await request.json().catch(() => ({}));

    try {
      if (pathname === '/device-code') {
        const data = await ghPost('/device/code', {
          client_id: body.client_id || env.GITHUB_CLIENT_ID,
          scope: body.scope || 'public_repo',
        });
        return new Response(JSON.stringify(data), { headers: json });
      }

      if (pathname === '/device-token') {
        const data = await ghPost('/oauth/access_token', {
          client_id: body.client_id || env.GITHUB_CLIENT_ID,
          device_code: body.device_code,
          grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
        });
        return new Response(JSON.stringify(data), { headers: json });
      }

      // Default route: popup web flow — exchange the code for a token. This is
      // the step that needs the client_secret, so it stays here on the server.
      const data = await ghPost('/oauth/access_token', {
        client_id: env.GITHUB_CLIENT_ID,
        client_secret: env.GITHUB_CLIENT_SECRET,
        code: body.code,
      });
      return new Response(JSON.stringify(data), { headers: json });
    } catch (e) {
      return new Response(
        JSON.stringify({ error: 'proxy_error', error_description: String(e) }),
        { status: 502, headers: json },
      );
    }
  },
};
