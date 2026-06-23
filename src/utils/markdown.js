/**
 * Shared markdown / frontmatter utilities used by EditModal, WysiwygEditor, and StructureEditor.
 */

export function splitFrontmatter(md) {
  const m = String(md).match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  return m
    ? { frontmatter: `---\n${m[1]}\n---\n`, content: m[2] }
    : { frontmatter: '', content: md };
}

export function slugify(str) {
  return String(str).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 50);
}

export function setFrontmatterField(content, key, value) {
  const m = content.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (m) {
    const raw = m[1];
    const body = m[2];
    const newRaw = raw.match(new RegExp(`^${key}:`, 'm'))
      ? raw.replace(new RegExp(`^${key}:.*`, 'm'), `${key}: ${value}`)
      : `${raw}\n${key}: ${value}`;
    return `---\n${newRaw}\n---\n${body}`;
  }
  return `---\n${key}: ${value}\n---\n\n${content}`;
}

export function inlineMd(text) {
  return text
    .replace(/`([^`\n]+)`/g, '<code>$1</code>')
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.+?)__/g, '<strong>$1</strong>')
    .replace(/\*([^*\n]+)\*/g, '<em>$1</em>')
    .replace(/_([^_\n]+)_/g, '<em>$1</em>')
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img alt="$1" src="$2" style="max-width:100%;height:auto">')
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

export function mdToHtml(md) {
  const lines = md.split('\n');
  const out = [];
  let i = 0;
  while (i < lines.length) {
    const line = lines[i];

    if (line.startsWith('```')) {
      const codeLines = [];
      i++;
      while (i < lines.length && !lines[i].startsWith('```')) {
        codeLines.push(lines[i++]);
      }
      out.push(`<pre><code>${codeLines.join('\n')}</code></pre>`);
      i++;
      continue;
    }

    const heading = line.match(/^(#{1,6})\s+(.+)$/);
    if (heading) {
      const lvl = heading[1].length;
      out.push(`<h${lvl}>${inlineMd(heading[2])}</h${lvl}>`);
      i++;
      continue;
    }

    if (line.match(/^[-*+]\s/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^[-*+]\s/)) {
        items.push(`<li>${inlineMd(lines[i].replace(/^[-*+]\s/, ''))}</li>`);
        i++;
      }
      out.push(`<ul>${items.join('')}</ul>`);
      continue;
    }

    if (line.match(/^\d+\.\s/)) {
      const items = [];
      while (i < lines.length && lines[i].match(/^\d+\.\s/)) {
        items.push(`<li>${inlineMd(lines[i].replace(/^\d+\.\s/, ''))}</li>`);
        i++;
      }
      out.push(`<ol>${items.join('')}</ol>`);
      continue;
    }

    if (line.match(/^>+\s/)) {
      const bqLines = [];
      while (i < lines.length && lines[i].match(/^>+\s?/)) {
        bqLines.push(inlineMd(lines[i].replace(/^>+\s?/, '')));
        i++;
      }
      out.push(`<blockquote><p>${bqLines.join('<br>')}</p></blockquote>`);
      continue;
    }

    if (line.trim() === '') {
      i++;
      continue;
    }

    const paraLines = [];
    while (
      i < lines.length &&
      lines[i].trim() !== '' &&
      !lines[i].match(/^#{1,6}\s/) &&
      !lines[i].match(/^[-*+]\s/) &&
      !lines[i].match(/^\d+\.\s/) &&
      !lines[i].match(/^>/) &&
      !lines[i].startsWith('```')
    ) {
      paraLines.push(inlineMd(lines[i]));
      i++;
    }
    if (paraLines.length > 0) {
      out.push(`<p>${paraLines.join('<br>')}</p>`);
    } else {
      // No rule matched and the paragraph loop consumed nothing — e.g. an empty
      // heading like "### " (hashes with no title) or a bare ">" that isn't a
      // valid blockquote. Skip the line so `i` always advances; otherwise the
      // outer while spins forever and freezes the tab.
      i++;
    }
  }
  return out.join('\n');
}

function nodeToMd(node) {
  let out = '';
  for (const child of node.childNodes) {
    if (child.nodeType === 3) {
      out += child.textContent;
      continue;
    }
    if (child.nodeType !== 1) continue;
    const tag = child.tagName.toLowerCase();
    const inner = nodeToMd(child);
    switch (tag) {
      case 'h1': out += `\n\n# ${inner.trim()}\n\n`; break;
      case 'h2': out += `\n\n## ${inner.trim()}\n\n`; break;
      case 'h3': out += `\n\n### ${inner.trim()}\n\n`; break;
      case 'h4': out += `\n\n#### ${inner.trim()}\n\n`; break;
      case 'h5': out += `\n\n##### ${inner.trim()}\n\n`; break;
      case 'h6': out += `\n\n###### ${inner.trim()}\n\n`; break;
      case 'strong': case 'b': out += `**${inner}**`; break;
      case 'em': case 'i': out += `*${inner}*`; break;
      case 'u': out += `__${inner}__`; break;
      case 's': case 'del': case 'strike': out += `~~${inner}~~`; break;
      case 'code':
        if (child.parentElement?.tagName.toLowerCase() === 'pre') out += inner;
        else out += `\`${inner}\``;
        break;
      case 'pre': out += `\n\n\`\`\`\n${inner}\n\`\`\`\n\n`; break;
      case 'a': out += `[${inner}](${child.getAttribute('href') || ''})`; break;
      case 'img': out += `![${child.getAttribute('alt') || ''}](${child.getAttribute('src') || ''})`; break;
      case 'iframe': {
        const src = child.getAttribute('src') || '';
        const w = child.getAttribute('width') || '560';
        const h = child.getAttribute('height') || '315';
        out += `\n\n<iframe width="${w}" height="${h}" src="${src}" frameborder="0" allowfullscreen style="max-width:100%"></iframe>\n\n`;
        break;
      }
      case 'video': {
        const src = child.getAttribute('src') || '';
        out += `\n\n<video src="${src}" controls style="max-width:100%;height:auto"></video>\n\n`;
        break;
      }
      case 'p': out += `\n\n${inner}\n\n`; break;
      case 'br': out += '\n'; break;
      case 'blockquote': out += `\n\n> ${inner.trim().replace(/\n/g, '\n> ')}\n\n`; break;
      case 'ul': {
        for (const li of child.querySelectorAll(':scope > li')) {
          out += `\n- ${nodeToMd(li).trim()}`;
        }
        out += '\n';
        break;
      }
      case 'ol': {
        let idx = 1;
        for (const li of child.querySelectorAll(':scope > li')) {
          out += `\n${idx}. ${nodeToMd(li).trim()}`;
          idx++;
        }
        out += '\n';
        break;
      }
      case 'li': out += inner; break;
      case 'span': {
        const colorMatch = (child.getAttribute('style') || '').match(/color\s*:\s*([^;]+)/i);
        out += colorMatch
          ? `<span style="color:${colorMatch[1].trim()}">${inner}</span>`
          : inner;
        break;
      }
      case 'div': out += `\n${inner}\n`; break;
      default: out += inner;
    }
  }
  return out;
}

export function htmlToMd(html) {
  // Remove empty anchor tags (id-only anchors from Word documents)
  const cleaned = html.replace(/<a\s+id="[^"]*">\s*<\/a>/g, '');
  const div = document.createElement('div');
  div.innerHTML = cleaned;
  return nodeToMd(div).replace(/\n{3,}/g, '\n\n').trim();
}

/* ── Embedded image extraction ───────────────────────────────────────── */

// Per-chapter co-located image folder (matches the repo convention: docs/<chapter>/images/).
export const IMAGE_DIR = 'images';

const IMG_EXT_BY_TYPE = {
  'image/png': 'png',
  'image/jpeg': 'jpg',
  'image/jpg': 'jpg',
  'image/gif': 'gif',
  'image/webp': 'webp',
  'image/svg+xml': 'svg',
  'image/bmp': 'bmp',
  'image/x-icon': 'ico',
  'image/avif': 'avif',
};

/** Maps a data-URI content type to a sensible file extension. */
function extForContentType(contentType) {
  if (IMG_EXT_BY_TYPE[contentType]) return IMG_EXT_BY_TYPE[contentType];
  const sub = (contentType.split('/')[1] || 'png').replace(/[^a-z0-9]/gi, '');
  return sub || 'png';
}

/**
 * Small deterministic string hash → short base36 token. Used to name extracted
 * images by their content, so re-running extraction on the same image yields the
 * same filename (idempotent — no duplicate images on repeated saves).
 */
function shortHash(str) {
  let h = 5381;
  for (let i = 0; i < str.length; i++) h = ((h << 5) + h + str.charCodeAt(i)) >>> 0;
  return (h.toString(36) + str.length.toString(36)).slice(0, 12);
}

/**
 * Replaces every embedded base64 data-URI image in `markdown` — both the
 * `![alt](data:…)` markdown form and raw `<img src="data:…">` HTML — with a
 * relative `images/<name>` reference, and returns the rewritten markdown plus
 * the list of image files to write alongside the page.
 *
 * Filenames are `<baseName>-<contentHash>.<ext>`, so identical images dedupe to
 * one file and repeated extraction is stable.
 *
 * @param {string} markdown
 * @param {string} baseName  slug used to prefix generated filenames (e.g. page slug)
 * @returns {{ markdown: string, assets: Array<{ name: string, base64: string, contentType: string }> }}
 */
export function extractDataUriImages(markdown, baseName) {
  const assets = [];
  const seen = new Set();
  const safeBase = slugify(baseName) || 'image';

  const register = (contentType, rawData) => {
    const base64 = rawData.replace(/\s+/g, '');
    const name = `${safeBase}-${shortHash(base64)}.${extForContentType(contentType)}`;
    if (!seen.has(name)) {
      seen.add(name);
      assets.push({ name, base64, contentType });
    }
    return `${IMAGE_DIR}/${name}`;
  };

  let out = String(markdown).replace(
    /!\[([^\]]*)\]\(\s*data:([^;,]+);base64,([^)\s]+)\s*\)/g,
    (_m, alt, contentType, data) => `![${alt}](${register(contentType, data)})`,
  );

  out = out.replace(
    /(<img\b[^>]*?\bsrc=["'])data:([^;,]+);base64,([^"']+)(["'][^>]*>)/gi,
    (_m, pre, contentType, data, post) => `${pre}${register(contentType, data)}${post}`,
  );

  return { markdown: out, assets };
}
