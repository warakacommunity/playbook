/**
 * Injects a "Download as PDF" button on template pages and on the
 * case-study retrospective template. The button opens the browser's
 * print dialog (Save as PDF), and a companion @media print stylesheet
 * in src/css/custom.css strips Docusaurus chrome and applies the
 * AfriAnnotate look-and-feel to the resulting PDF.
 *
 * Templates are content designed to be forked and printed, so the
 * download affordance is a first-class UI element on those pages
 * rather than something the reader has to discover through the
 * browser menu.
 */
function isTemplatePage() {
  if (typeof window === 'undefined') return false;
  const path = window.location.pathname.replace(/\/+$/, '');
  // Match /templates/<slug> but NOT /templates or /templates/ (the index).
  const inTemplates = /\/templates\/[^/]+$/.test(path);
  const isRetro = /\/case-studies\/_retrospective-template$/.test(path);
  return inTemplates || isRetro;
}

function ensureButton() {
  if (typeof window === 'undefined' || typeof document === 'undefined') return;
  const existing = document.getElementById('afri-pdf-download-button');
  if (!isTemplatePage()) {
    if (existing) existing.remove();
    return;
  }
  if (existing) return; // already present on this page

  const button = document.createElement('button');
  button.id = 'afri-pdf-download-button';
  button.type = 'button';
  button.className = 'afri-pdf-download-button';
  button.setAttribute('aria-label', 'Download this template as PDF');
  button.setAttribute('title', 'Save this template as a PDF via your browser\'s print dialog');
  button.innerHTML =
    '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">' +
    '<path d="M12 3v11" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '<path d="M7 9l5 5 5-5" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>' +
    '<path d="M5 20h14" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>' +
    '</svg>' +
    '<span>Download as PDF</span>';
  button.addEventListener('click', () => {
    // Small delay lets any hover state settle before the print dialog steals focus.
    window.setTimeout(() => window.print(), 60);
  });

  document.body.appendChild(button);
}

export function onRouteDidUpdate() {
  if (typeof window === 'undefined') return;
  // Two rAF beats so the new route's article DOM is definitely mounted
  // before we probe the path and add the button. Matches the pattern
  // used by src/clientModules/externalLinks.js.
  window.requestAnimationFrame(() => window.requestAnimationFrame(ensureButton));
}
