import { slugify } from './markdown';

const OWNER = 'warakacommunity';
const REPO = 'AfriPlaybook';
const BASE_BRANCH = 'main';
const API = 'https://api.github.com';
const RAW = `https://raw.githubusercontent.com/${OWNER}/${REPO}/${BASE_BRANCH}`;

/** Unicode-safe base64: percent-encodes then collapses to byte chars before btoa. */
function encodeBase64(str) {
  return btoa(
    encodeURIComponent(str).replace(/%([0-9A-F]{2})/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16))
    )
  );
}

/**
 * Authenticated GitHub API fetch. Throws on non-2xx responses and attaches
 * `.status` to the error so callers can branch on 403/404 without re-parsing.
 */
async function ghFetch(path, token, opts = {}) {
  const res = await fetch(`${API}${path}`, {
    ...opts,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      'Content-Type': 'application/json',
      ...opts.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    const err = new Error(`GitHub ${res.status}: ${text}`);
    err.status = res.status;
    throw err;
  }
  return res.json();
}

/**
 * GitHub Device Flow — no client_secret required; the proxy only adds CORS headers.
 * Returns { device_code, user_code, verification_uri, expires_in, interval }.
 * Show `user_code` in the UI, then call `pollDeviceFlow` to await authorisation.
 */
export async function startDeviceFlow(clientId, proxyUrl) {
  const resp = await fetch(`${proxyUrl}/device-code`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ client_id: clientId, scope: 'public_repo' }),
  });
  if (!resp.ok) throw new Error(`Device flow init failed: ${resp.status}`);
  return resp.json();
  // → { device_code, user_code, verification_uri, expires_in, interval }
}

/**
 * Polls the proxy until the user approves (returns token), cancels, or the
 * code expires. `signal` is an AbortSignal — resolves with access_token string.
 * Handles GitHub's `slow_down` error by adding 5 s to every subsequent poll.
 */
export async function pollDeviceFlow(clientId, deviceCode, proxyUrl, intervalSecs, signal) {
  let wait = intervalSecs;
  while (true) {
    await new Promise(r => setTimeout(r, wait * 1000));
    if (signal?.aborted) throw new Error('cancelled');

    const resp = await fetch(`${proxyUrl}/device-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client_id: clientId,
        device_code: deviceCode,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });
    const data = await resp.json();
    if (data.access_token) return data.access_token;
    if (data.error === 'authorization_pending') continue;
    if (data.error === 'slow_down') { wait += 5; continue; }
    if (data.error === 'expired_token') throw new Error('Code expired — please try again.');
    if (data.error === 'access_denied') throw new Error('Access denied on GitHub.');
    throw new Error(data.error_description || data.error || 'Device flow failed.');
  }
}

export async function loginWithGitHub(clientId, proxyUrl, callbackUrl) {
  const authUrl =
    `https://github.com/login/oauth/authorize` +
    `?client_id=${encodeURIComponent(clientId)}` +
    `&scope=public_repo` +
    `&redirect_uri=${encodeURIComponent(callbackUrl)}`;

  const popup = window.open(authUrl, 'github-oauth', 'width=620,height=720,left=200,top=100');
  if (!popup) throw new Error('Popup was blocked. Please allow popups for this site.');

  // Wait for the callback page to post the code back
  const code = await new Promise((resolve, reject) => {
    function onMessage(e) {
      if (e.origin !== window.location.origin) return;
      if (e.data?.type !== 'github-oauth-callback') return;
      window.removeEventListener('message', onMessage);
      clearInterval(closedCheck);
      if (e.data.error) reject(new Error(e.data.errorDesc || e.data.error));
      else resolve(e.data.code);
    }
    window.addEventListener('message', onMessage);

    // Detect if user closed the popup without completing
    const closedCheck = setInterval(() => {
      if (popup.closed) {
        clearInterval(closedCheck);
        window.removeEventListener('message', onMessage);
        reject(new Error('cancelled'));
      }
    }, 500);
  });

  // Exchange code for token via the proxy (client_secret stays on the proxy)
  const resp = await fetch(proxyUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ code }),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err.error_description || err.error || `Exchange failed: ${resp.status}`);
  }

  const { access_token } = await resp.json();
  if (!access_token) throw new Error('No access token returned from proxy.');
  return access_token;
}

export async function verifyGitHubToken(token) {
  const user = await ghFetch('/user', token);
  return { username: user.login, avatarUrl: user.avatar_url, name: user.name || user.login };
}

export async function fetchRawFile(filePath) {
  const res = await fetch(`${RAW}/${filePath}`);
  if (!res.ok) throw new Error(`Cannot fetch ${filePath}: ${res.status}`);
  return res.text();
}

/** Public raw URL for a repo path on the base branch — used to preview committed images. */
export function rawUrl(filePath) {
  return `${RAW}/${filePath}`;
}

async function ghFetchPublic(path) {
  const res = await fetch(`${API}${path}`, {
    headers: { Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28' },
  });
  if (!res.ok) throw new Error(`GitHub ${res.status}`);
  return res.json();
}

function titleCase(slug) {
  return slug.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase());
}

function buildDocsTree(files, cats, basePath = 'docs', pagePositions = {}) {
  const prefix = basePath + '/';
  const directFiles = files.filter(f => {
    const rel = f.path.slice(prefix.length);
    return f.path.startsWith(prefix) && rel && !rel.includes('/');
  });
  const subdirs = [...new Set(
    files
      .filter(f => f.path.startsWith(prefix) && f.path.slice(prefix.length).includes('/'))
      .map(f => f.path.slice(prefix.length).split('/')[0])
      .filter(Boolean),
  )];

  const nodes = [];

  for (const f of directFiles) {
    if (!f.path.endsWith('.md')) continue;
    const slug = f.path.replace(/^.*\//, '').replace('.md', '');
    if (slug === 'index') continue;
    const position = pagePositions[f.path] != null ? pagePositions[f.path] : Infinity;
    nodes.push({ type: 'page', slug, path: f.path, label: titleCase(slug), sha: f.sha, position, children: [] });
  }

  for (const dir of subdirs) {
    const catPath = `${basePath}/${dir}/_category_.json`;
    const cat = cats[catPath];
    if (!cat) continue;
    const children = buildDocsTree(files, cats, `${basePath}/${dir}`, pagePositions);
    nodes.push({
      type: 'section',
      slug: dir,
      path: `${basePath}/${dir}`,
      label: cat.label || titleCase(dir),
      position: cat.position != null ? cat.position : Infinity,
      categoryData: cat,
      children,
    });
  }

  nodes.sort((a, b) => {
    const pa = isFinite(a.position) ? a.position : Infinity;
    const pb = isFinite(b.position) ? b.position : Infinity;
    if (pa !== pb) return pa - pb;
    return a.slug.localeCompare(b.slug);
  });

  return nodes;
}

/**
 * Derives the docs tree that the user would see after their pending edits land.
 * Overlays `changes` (add/rename/delete ops) on top of the live git file list
 * before building the tree, so the UI reflects unsaved work without a round-trip.
 */
export function computeDocsTree(gitFiles, catData, changes) {
  let files = [...gitFiles];
  const cats = { ...catData };
  const pagePositions = {}; // Extract sidebar_position from page files

  for (const [path, change] of Object.entries(changes)) {
    if (change.op === 'delete') {
      files = files.filter(f => f.path !== path);
      if (path.endsWith('_category_.json')) delete cats[path];
    } else {
      if (!files.find(f => f.path === path)) files.push({ path, sha: null });
      if (path.endsWith('_category_.json')) {
        try { cats[path] = JSON.parse(change.content); } catch {}
      } else if (path.endsWith('.md')) {
        // Extract sidebar_position from page frontmatter
        const match = change.content.match(/^---\n([\s\S]*?)\n---/);
        if (match) {
          const frontmatter = match[1];
          const posMatch = frontmatter.match(/sidebar_position:\s*(\d+)/);
          if (posMatch) {
            pagePositions[path] = parseInt(posMatch[1], 10);
          }
        }
      }
    }
  }

  return buildDocsTree(files, cats, 'docs', pagePositions);
}

export async function fetchDocsTree(token) {
  const fetcher = token ? (p) => ghFetch(p, token) : ghFetchPublic;

  const ref = await fetcher(`/repos/${OWNER}/${REPO}/git/ref/heads/${BASE_BRANCH}`);
  const commit = await fetcher(`/repos/${OWNER}/${REPO}/git/commits/${ref.object.sha}`);
  const treeData = await fetcher(`/repos/${OWNER}/${REPO}/git/trees/${commit.tree.sha}?recursive=1`);

  const files = treeData.tree.filter(f => f.path.startsWith('docs/') && f.type === 'blob');
  const catPaths = files.filter(f => f.path.endsWith('_category_.json'));

  const cats = {};
  await Promise.all(
    catPaths.map(async f => {
      try {
        const text = await fetch(`${RAW}/${f.path}`).then(r => r.text());
        cats[f.path] = JSON.parse(text);
      } catch {}
    }),
  );

  return { files, cats };
}

export async function createStructurePR({ token, changes, prTitle, prBody }) {
  try {
    const user = await ghFetch('/user', token);
    const userLogin = user.login;

    let targetRepoOwner = OWNER;
    let targetRepoName = REPO;
    let useFork = false;
    let defaultBranch = BASE_BRANCH;
    let hasWriteAccess = false;

    // Check if user has write access to the main repo
    try {
      const repo = await ghFetch(`/repos/${OWNER}/${REPO}`, token);
      // Check if user has push permission (write access)
      hasWriteAccess = repo.permissions?.push === true;
    } catch {
      hasWriteAccess = false;
    }

    if (!hasWriteAccess) {
      // No write access to main repo; check for fork
      try {
        const fork = await ghFetch(`/repos/${userLogin}/${REPO}`, token);
        if (fork?.fork) {
          targetRepoOwner = userLogin;
          useFork = true;
          defaultBranch = fork.default_branch || BASE_BRANCH;
        } else {
          throw new Error('user-no-fork');
        }
      } catch (forkError) {
        // Fork doesn't exist
        throw new Error(
          `You don't have write access to the main repository.\n\n` +
          `To contribute publicly, please:\n\n` +
          `1️⃣  Fork the repository:\n` +
          `   https://github.com/${OWNER}/${REPO}/fork\n\n` +
          `2️⃣  Wait 10-15 seconds for the fork to be created\n\n` +
          `3️⃣  Return to this window and submit your PR again\n\n` +
          `Your fork will be available at:\n` +
          `https://github.com/${userLogin}/${REPO}`
        );
      }
    }

    const branch = `structure/edit-${Date.now().toString(36)}`;

    // If using fork, use contents API (write to default branch directly)
    if (useFork) {
      for (const change of changes) {
        if (change.op === 'delete') {
          const existing = await ghFetch(
            `/repos/${targetRepoOwner}/${targetRepoName}/contents/${change.path}?ref=${defaultBranch}`,
            token
          );
          await ghFetch(`/repos/${targetRepoOwner}/${targetRepoName}/contents/${change.path}`, token, {
            method: 'DELETE',
            body: JSON.stringify({
              message: `delete: ${change.path}`,
              sha: existing.sha,
            }),
          });
        } else {
          let existing = null;
          try {
            existing = await ghFetch(
              `/repos/${targetRepoOwner}/${targetRepoName}/contents/${change.path}?ref=${defaultBranch}`,
              token
            );
          } catch {
            // File doesn't exist yet
          }

          await ghFetch(`/repos/${targetRepoOwner}/${targetRepoName}/contents/${change.path}`, token, {
            method: 'PUT',
            body: JSON.stringify({
              message: `${change.op === 'add' ? 'add' : 'edit'}: ${change.path}`,
              // Binary images arrive already base64-encoded; text must be encoded here.
              content: change.encoding === 'base64' ? change.content : encodeBase64(change.content),
              sha: existing?.sha,
            }),
          });
        }
      }
    } else {
      // Use tree API for main repo (owner only)
      const ref = await ghFetch(`/repos/${OWNER}/${REPO}/git/ref/heads/${BASE_BRANCH}`, token);
      const baseCommitSha = ref.object.sha;
      const baseCommit = await ghFetch(`/repos/${OWNER}/${REPO}/git/commits/${baseCommitSha}`, token);

      // Binary images (encoding: 'base64') can't ride along as inline tree `content`
      // (the trees API treats it as UTF-8 text) — upload them as blobs and reference the sha.
      const treeEntries = await Promise.all(
        changes
          .filter(c => c.op !== 'delete')
          .map(async c => {
            if (c.encoding === 'base64') {
              const blob = await ghFetch(`/repos/${OWNER}/${REPO}/git/blobs`, token, {
                method: 'POST',
                body: JSON.stringify({ content: c.content, encoding: 'base64' }),
              });
              return { path: c.path, mode: '100644', type: 'blob', sha: blob.sha };
            }
            return { path: c.path, mode: '100644', type: 'blob', content: c.content };
          }),
      );

      const treeResult = await ghFetch(`/repos/${OWNER}/${REPO}/git/trees`, token, {
        method: 'POST',
        body: JSON.stringify({ base_tree: baseCommit.tree.sha, tree: treeEntries }),
      });

      const newCommit = await ghFetch(`/repos/${OWNER}/${REPO}/git/commits`, token, {
        method: 'POST',
        body: JSON.stringify({ message: prTitle, tree: treeResult.sha, parents: [baseCommitSha] }),
      });

      await ghFetch(`/repos/${OWNER}/${REPO}/git/refs`, token, {
        method: 'POST',
        body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: newCommit.sha }),
      });
    }

    // Create PR from fork/branch to main repo
    const prHead = useFork ? `${targetRepoOwner}:${defaultBranch}` : branch;
    const pr = await ghFetch(`/repos/${OWNER}/${REPO}/pulls`, token, {
      method: 'POST',
      body: JSON.stringify({ title: prTitle, head: prHead, base: BASE_BRANCH, body: prBody }),
    });

    return { number: pr.number, url: pr.html_url, branch: defaultBranch };
  } catch (error) {
    throw error;
  }
}

/**
 * Opens a PR that edits a single file, plus any binary `assets` it references.
 * `assets` is an optional array of `{ path, base64 }` image files to commit
 * alongside the edited content. The edit + images land in one atomic commit
 * (git trees/blobs API) so a page never references an image that isn't there.
 */
export async function createEditPR({ token, filePath, newContent, prTitle, prBody, assets = [] }) {
  const branch = `edit/${slugify(filePath.replace(/[/.]/g, '-'))}-${Date.now().toString(36)}`;

  const ref = await ghFetch(`/repos/${OWNER}/${REPO}/git/ref/heads/${BASE_BRANCH}`, token);
  const baseCommitSha = ref.object.sha;
  const baseCommit = await ghFetch(`/repos/${OWNER}/${REPO}/git/commits/${baseCommitSha}`, token);

  // Upload each image as a blob, then reference its sha in the tree (inline tree
  // `content` is UTF-8-only and would corrupt binary data).
  const assetEntries = await Promise.all(
    assets.map(async a => {
      const blob = await ghFetch(`/repos/${OWNER}/${REPO}/git/blobs`, token, {
        method: 'POST',
        body: JSON.stringify({ content: a.base64, encoding: 'base64' }),
      });
      return { path: a.path, mode: '100644', type: 'blob', sha: blob.sha };
    }),
  );

  const tree = await ghFetch(`/repos/${OWNER}/${REPO}/git/trees`, token, {
    method: 'POST',
    body: JSON.stringify({
      base_tree: baseCommit.tree.sha,
      tree: [
        { path: filePath, mode: '100644', type: 'blob', content: newContent },
        ...assetEntries,
      ],
    }),
  });

  const newCommit = await ghFetch(`/repos/${OWNER}/${REPO}/git/commits`, token, {
    method: 'POST',
    body: JSON.stringify({ message: `edit: ${filePath}`, tree: tree.sha, parents: [baseCommitSha] }),
  });

  await ghFetch(`/repos/${OWNER}/${REPO}/git/refs`, token, {
    method: 'POST',
    body: JSON.stringify({ ref: `refs/heads/${branch}`, sha: newCommit.sha }),
  });

  const pr = await ghFetch(`/repos/${OWNER}/${REPO}/pulls`, token, {
    method: 'POST',
    body: JSON.stringify({
      title: prTitle,
      head: branch,
      base: BASE_BRANCH,
      body: prBody,
    }),
  });

  return { number: pr.number, url: pr.html_url, branch };
}
