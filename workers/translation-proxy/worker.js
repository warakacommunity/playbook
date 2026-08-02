// Translation proxy for the AfriPlaybook "Contribute" editor.
//
// A static site can't call the translation engines directly: MyMemory needs no
// key but sends no CORS headers, and the Helsinki-NLP models on Hugging Face
// need an API token that must never ship in browser code. This tiny worker
// solves both — it keeps the token server-side, adds CORS, and normalises the
// two engines to one response shape the editor understands.
//
// Contract (the editor's autoTranslateChunk expects exactly this):
//   POST { text, tgt_lang }  ->  [ { translation_text } ]   on success
//                            ->  { error }                   on failure
//
// Engine routing:
//   Primary   -> Cloudflare Workers AI (@cf/meta/m2m100-1.2b), on-platform, no
//                external rate limits. Covers 12 of the 14 editor languages.
//   Fallback  -> MyMemory, for Oromo/Kinyarwanda (not in m2m100) and any time
//                Workers AI errors. Runs from Cloudflare's shared egress IPs, so
//                it needs MYMEMORY_EMAIL to avoid the anonymous per-IP quota.
//
// Config (Cloudflare -> Settings -> Variables):
//   AI               (binding)  Workers AI — see [ai] in wrangler.toml
//   ALLOWED_ORIGIN   (var)      comma-separated allowlist, e.g. https://waraka.org
//   MYMEMORY_EMAIL   (var)      raises MyMemory's fallback quota to 50k words/day

// ISO code -> the English language name @cf/meta/m2m100-1.2b expects. Languages
// absent here (om Oromo, rw Kinyarwanda) aren't in m2m100 and use MyMemory.
const M2M100_NAMES = {
  am: 'amharic', ar: 'arabic', de: 'german', es: 'spanish', fr: 'french',
  ha: 'hausa', ig: 'igbo', pt: 'portuguese', so: 'somali', sw: 'swahili',
  yo: 'yoruba', zu: 'zulu',
};

// MyMemory caps a single anonymous request near 500 bytes, so split long blocks
// on whitespace and translate the pieces. Draft quality — boundaries needn't be
// perfect, just under the limit.
const MYMEMORY_MAX = 450;

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

// Break text into <= MYMEMORY_MAX chunks at word boundaries.
function chunkText(text) {
  const words = text.split(/(\s+)/); // keep separators so we can rejoin verbatim
  const chunks = [];
  let cur = '';
  for (const w of words) {
    if (cur.length + w.length > MYMEMORY_MAX && cur) {
      chunks.push(cur);
      cur = '';
    }
    cur += w;
  }
  if (cur) chunks.push(cur);
  return chunks.length ? chunks : [text];
}

async function translateMyMemory(text, tgtLang, env) {
  const chunks = chunkText(text);
  const out = [];
  for (const chunk of chunks) {
    if (!chunk.trim()) { out.push(chunk); continue; } // preserve pure whitespace
    const url = new URL('https://api.mymemory.translated.net/get');
    url.searchParams.set('q', chunk);
    url.searchParams.set('langpair', `en|${tgtLang}`);
    if (env.MYMEMORY_EMAIL) url.searchParams.set('de', env.MYMEMORY_EMAIL);
    const res = await fetch(url, { headers: { Accept: 'application/json' } });
    const data = await res.json();
    const translated = data?.responseData?.translatedText;
    if (!translated || data.responseStatus >= 400) {
      throw new Error(data?.responseDetails || `MyMemory error (${data?.responseStatus})`);
    }
    out.push(translated);
  }
  return out.join('');
}

async function translateWorkersAI(text, tgtLang, env) {
  if (!env.AI) throw new Error('AI binding not configured');
  const target = M2M100_NAMES[tgtLang];
  if (!target) throw new Error(`m2m100 has no ${tgtLang}`);
  // m2m100 occasionally returns an empty body or a transient error; one retry
  // clears it and avoids dropping to the (rate-limited) MyMemory fallback.
  let lastErr;
  for (let attempt = 0; attempt < 2; attempt++) {
    try {
      const out = await env.AI.run('@cf/meta/m2m100-1.2b', {
        text,
        source_lang: 'english',
        target_lang: target,
      });
      const translated = out?.translated_text;
      if (translated) return translated;
      lastErr = new Error('Workers AI returned no translation');
    } catch (e) {
      lastErr = e;
    }
  }
  throw lastErr;
}

export default {
  async fetch(request, env) {
    const origin = resolveOrigin(request, env);
    const cors = corsHeaders(origin);
    const json = { ...cors, 'Content-Type': 'application/json' };

    if (request.method === 'OPTIONS') return new Response(null, { headers: cors });
    if (request.method !== 'POST') {
      return new Response(JSON.stringify({ error: 'Method not allowed' }), { status: 405, headers: json });
    }

    const body = await request.json().catch(() => ({}));
    const text = (body.text || '').toString();
    const tgtLang = (body.tgt_lang || '').toString().trim().toLowerCase();

    if (!text.trim()) return new Response(JSON.stringify([{ translation_text: text }]), { headers: json });
    if (!tgtLang) return new Response(JSON.stringify({ error: 'Missing tgt_lang' }), { status: 400, headers: json });

    try {
      let translation;
      if (M2M100_NAMES[tgtLang]) {
        try {
          translation = await translateWorkersAI(text, tgtLang, env);
        } catch (e) {
          // Workers AI unavailable / errored — fall back to MyMemory.
          console.log('Workers AI failed, falling back to MyMemory:', String(e));
          translation = await translateMyMemory(text, tgtLang, env);
        }
      } else {
        // om, rw — not in m2m100.
        translation = await translateMyMemory(text, tgtLang, env);
      }
      return new Response(JSON.stringify([{ translation_text: translation }]), { headers: json });
    } catch (e) {
      return new Response(JSON.stringify({ error: String(e.message || e) }), { status: 502, headers: json });
    }
  },
};
