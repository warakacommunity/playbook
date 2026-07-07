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

  const article = document.querySelector('article');
  if (!article) return;
  const h1 = article.querySelector('h1');
  if (!h1) return;

  // Build the button.
  const button = document.createElement('button');
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
    window.setTimeout(() => window.print(), 60);
  });

  // Preferred anchor: the first admonition (:::tip, :::warning, :::info,
  // :::note) that appears near the top of the page. Wrap it and the
  // button in a flex row so they sit side by side — admonition on the
  // left, button on the right.
  //
  // Fallback: no admonition at the top → inject the button inline right
  // after the H1 so it still lives in the content flow.
  let firstAdmonition = null;
  let node = h1.nextElementSibling;
  // Skip up to 3 intervening blocks (a stray <hr/> or metadata line)
  // before we give up and treat the page as admonition-less.
  for (let hops = 0; node && hops < 3; hops += 1) {
    if (node.matches('.theme-admonition, .admonition, [class*="admonition"]')) {
      firstAdmonition = node;
      break;
    }
    // A paragraph before an admonition still counts as "no top-of-page
    // callout" for our purposes — we only pair with an admonition that
    // is the reader's first non-title block.
    if (node.matches('p, section')) break;
    node = node.nextElementSibling;
  }

  const wrapper = document.createElement('div');
  wrapper.id = 'afri-pdf-download-button';

  if (firstAdmonition) {
    wrapper.className = 'afri-pdf-download-row';
    firstAdmonition.insertAdjacentElement('beforebegin', wrapper);
    wrapper.appendChild(firstAdmonition);
    const buttonCol = document.createElement('div');
    buttonCol.className = 'afri-pdf-download-row__button-col';
    buttonCol.appendChild(button);
    wrapper.appendChild(buttonCol);
  } else {
    wrapper.className = 'afri-pdf-download-button-wrapper';
    wrapper.appendChild(button);
    h1.insertAdjacentElement('afterend', wrapper);
  }
}

export function onRouteDidUpdate() {
  if (typeof window === 'undefined') return;
  // Two rAF beats so the new route's article DOM is definitely mounted
  // before we probe the path and add the button. Matches the pattern
  // used by src/clientModules/externalLinks.js.
  window.requestAnimationFrame(() => window.requestAnimationFrame(ensureButton));
}
