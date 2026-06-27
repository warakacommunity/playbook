/**
 * Marks external links inside page content so they open in a new tab and can
 * be styled with the conventional external-link affordance (underline + arrow).
 *
 * A link counts as external when its host differs from the site's host. We add
 * target/rel for safe new-tab behaviour and a `data-external` attribute that the
 * stylesheet hooks onto for the underline and the ↗ glyph.
 */
function markExternalLinks() {
  if (typeof window === 'undefined') return;
  const scopes = document.querySelectorAll('.markdown, article');
  scopes.forEach((scope) => {
    scope.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute('href') || '';
      if (!/^https?:\/\//i.test(href)) return; // skip relative, anchors, mailto
      if (a.hasAttribute('data-external')) return; // already processed
      let isExternal = false;
      try {
        isExternal = new URL(href, window.location.href).host !== window.location.host;
      } catch {
        isExternal = false;
      }
      if (!isExternal) return;
      a.setAttribute('target', '_blank');
      a.setAttribute('rel', 'noopener noreferrer');
      a.setAttribute('data-external', 'true');
    });
  });
}

export function onRouteDidUpdate() {
  if (typeof window === 'undefined') return;
  // Run after the new route's content has rendered.
  window.requestAnimationFrame(() => window.requestAnimationFrame(markExternalLinks));
}
