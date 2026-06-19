import { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import { fetchRawFile, createEditPR, rawUrl } from '@site/src/utils/github';
import { splitFrontmatter, mdToHtml, htmlToMd, extractDataUriImages, IMAGE_DIR } from '@site/src/utils/markdown';
import { WysiwygEditor } from '@site/src/components/WysiwygEditor';
import styles from './index.module.css';

export { mdToHtml, htmlToMd, WysiwygEditor };

/** Turn co-located `images/<file>` refs into raw GitHub URLs so committed images preview. */
function resolveAssetsForDisplay(md, filePath) {
  const dir = filePath.replace(/\/[^/]+$/, '');
  const toUrl = name => rawUrl(`${dir}/${IMAGE_DIR}/${name}`);
  return String(md)
    .replace(/!\[([^\]]*)\]\((?:\.\/)?images\/([^)\s]+)\)/g, (_m, alt, name) => `![${alt}](${toUrl(name)})`)
    .replace(/(<img\b[^>]*?\bsrc=["'])(?:\.\/)?images\/([^"']+)(["'][^>]*>)/gi, (_m, pre, name, post) => `${pre}${toUrl(name)}${post}`);
}

/* ── Form field helper ───────────────────────────────────────────────── */

function FormField({ label, value, onChange, multiline }) {
  return (
    <div className={styles.formField}>
      <label className={styles.fieldLabel}>{label}</label>
      {multiline ? (
        <textarea
          className={styles.fieldInput}
          rows={4}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      ) : (
        <input
          type="text"
          className={styles.fieldInput}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
      )}
    </div>
  );
}

/* ── Main Modal ──────────────────────────────────────────────────────── */

function ModalContent({ onClose, mode, filePath, itemId, itemData, pageTitle, initialMd }) {
  const { siteConfig } = useDocusaurusContext();
  const buildToken = siteConfig.customFields?.GITHUB_EDIT_TOKEN || '';

  const [token, setToken] = useState('');
  const [htmlContent, setHtmlContent] = useState('');
  const [frontmatter, setFrontmatter] = useState('');
  const [formData, setFormData] = useState({});
  const [fetching, setFetching] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const stored = sessionStorage.getItem('gh_edit_token');
    setToken(stored || buildToken);
  }, [buildToken]);

  useEffect(() => {
    if (mode === 'markdown' && filePath) {
      if (initialMd !== undefined) {
        const { frontmatter: fm, content } = splitFrontmatter(initialMd);
        setFrontmatter(fm);
        setHtmlContent(mdToHtml(resolveAssetsForDisplay(content, filePath)));
        return;
      }
      setFetching(true);
      setError('');
      fetchRawFile(filePath)
        .then((md) => {
          const { frontmatter: fm, content } = splitFrontmatter(md);
          setFrontmatter(fm);
          setHtmlContent(mdToHtml(resolveAssetsForDisplay(content, filePath)));
        })
        .catch((err) => setError(`Failed to load content: ${err.message}`))
        .finally(() => setFetching(false));
    } else if (itemData) {
      setFormData({ ...itemData });
    }
  }, [mode, filePath, itemData, initialMd]);

  const handleTokenChange = (val) => {
    setToken(val);
    if (val) sessionStorage.setItem('gh_edit_token', val);
    else sessionStorage.removeItem('gh_edit_token');
  };

  const handleSubmit = async () => {
    if (!token.trim()) {
      setError('A GitHub personal access token is required.');
      return;
    }
    setSubmitting(true);
    setError('');
    try {
      let newContent, prTitle, prBody, assets = [];

      if (mode === 'markdown') {
        const dir = filePath.replace(/\/[^/]+$/, '');
        const baseName = filePath.replace(/^.*\//, '').replace(/\.[^.]+$/, '');
        // Editor previews committed images via raw URLs — turn those back into
        // co-located images/ refs, then extract any newly-embedded base64 images.
        let md = htmlToMd(htmlContent).split(`${rawUrl(`${dir}/${IMAGE_DIR}/`)}`).join(`${IMAGE_DIR}/`);
        const extracted = extractDataUriImages(md, baseName);
        md = extracted.markdown;
        assets = extracted.assets.map(a => ({ path: `${dir}/${IMAGE_DIR}/${a.name}`, base64: a.base64 }));
        newContent = frontmatter + md + '\n';
        prTitle = `Edit: ${pageTitle || filePath}`;
        prBody = [
          `Community-suggested edit for **${pageTitle || filePath}**.`,
          '',
          '_Submitted via the website editor._',
        ].join('\n');
      } else {
        const raw = await fetchRawFile(filePath);
        const arr = JSON.parse(raw);
        const idx = arr.findIndex((item) => item.id === itemId);
        if (idx === -1) throw new Error('Item not found. The data may have changed — please refresh and try again.');
        arr[idx] = { ...arr[idx], ...formData };
        newContent = JSON.stringify(arr, null, 2) + '\n';
        prTitle = `Edit ${mode} card: "${formData.title || formData.name || itemId}"`;
        prBody = [
          `Community-suggested edit for **${mode}** card \`${itemId}\`.`,
          '',
          '_Submitted via the website editor._',
        ].join('\n');
      }

      const pr = await createEditPR({ token, filePath, newContent, prTitle, prBody, assets });
      setSuccess(pr);
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const modeLabel = mode === 'markdown'
    ? `Suggest an edit — ${pageTitle || filePath}`
    : mode === 'news'
    ? 'Edit news card'
    : 'Edit community card';

  return (
    <div className={styles.overlay} onMouseDown={(e) => { if (e.target === e.currentTarget) onClose(); }}>
      <div className={styles.modal} role="dialog" aria-modal="true" aria-label={modeLabel}>
        {/* Header */}
        <div className={styles.modalHeader}>
          <h2 className={styles.modalTitle}>{modeLabel}</h2>
          <button className={styles.closeBtn} onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Body */}
        <div className={styles.modalBody}>
          {success ? (
            <div className={styles.successBox}>
              <div className={styles.successIcon}>✓</div>
              <p className={styles.successText}>Pull request created successfully!</p>
              <a
                href={success.url}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.prLink}
              >
                View PR #{success.number} on GitHub →
              </a>
              <p className={styles.successNote}>
                A maintainer will review and merge your suggested changes. Thank you!
              </p>
              <button className={styles.closeSuccessBtn} onClick={onClose}>Close</button>
            </div>
          ) : (
            <>
              {/* Markdown WYSIWYG editor */}
              {mode === 'markdown' && (
                <div className={styles.editorSection}>
                  {fetching ? (
                    <div className={styles.loadingBox}>Loading content from GitHub…</div>
                  ) : (
                    <WysiwygEditor initialHtml={htmlContent} onChange={setHtmlContent} />
                  )}
                </div>
              )}

              {/* News card fields */}
              {mode === 'news' && (
                <div className={styles.formSection}>
                  <FormField label="Date" value={formData.date || ''} onChange={(v) => setFormData((d) => ({ ...d, date: v }))} />
                  <FormField label="Tag / Category" value={formData.tag || ''} onChange={(v) => setFormData((d) => ({ ...d, tag: v }))} />
                  <FormField label="Title" value={formData.title || ''} onChange={(v) => setFormData((d) => ({ ...d, title: v }))} />
                  <FormField label="Body text" value={formData.body || ''} onChange={(v) => setFormData((d) => ({ ...d, body: v }))} multiline />
                  <FormField label="Link URL (optional)" value={formData.href || ''} onChange={(v) => setFormData((d) => ({ ...d, href: v || null }))} />
                </div>
              )}

              {/* Community card fields */}
              {mode === 'community' && (
                <div className={styles.formSection}>
                  <FormField label="Name" value={formData.name || ''} onChange={(v) => setFormData((d) => ({ ...d, name: v }))} />
                  <FormField label="Website URL" value={formData.url || ''} onChange={(v) => setFormData((d) => ({ ...d, url: v }))} />
                  <FormField label="Role / Description" value={formData.role || ''} onChange={(v) => setFormData((d) => ({ ...d, role: v }))} />
                </div>
              )}

              {/* Token */}
              <div className={styles.tokenSection}>
                <div className={styles.tokenRow}>
                  <label htmlFor="gh-token" className={styles.tokenLabel}>
                    GitHub Personal Access Token
                  </label>
                  <a
                    href="https://github.com/settings/tokens/new?scopes=public_repo&description=Masakhane+Playbook+Edit"
                    target="_blank"
                    rel="noreferrer noopener"
                    className={styles.tokenCreateLink}
                  >
                    Create one →
                  </a>
                </div>
                <input
                  id="gh-token"
                  type="password"
                  className={styles.tokenInput}
                  value={token}
                  onChange={(e) => handleTokenChange(e.target.value)}
                  placeholder="ghp_xxxxxxxxxxxx"
                  autoComplete="off"
                />
                <p className={styles.tokenHint}>
                  Your token stays in your browser session only. It needs <code>public_repo</code> scope to create a pull request.
                </p>
              </div>

              {error && <div className={styles.errorBox}>{error}</div>}

              {/* Actions */}
              <div className={styles.actions}>
                <button className={styles.cancelBtn} onClick={onClose} type="button">
                  Cancel
                </button>
                <button
                  className={styles.submitBtn}
                  onClick={handleSubmit}
                  disabled={submitting || fetching}
                  type="button"
                >
                  {submitting ? 'Creating pull request…' : 'Submit as Pull Request'}
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default function EditModal(props) {
  if (typeof window === 'undefined' || !props.isOpen) return null;
  return ReactDOM.createPortal(
    <ModalContent {...props} />,
    document.body
  );
}

/* ── Edit Button (convenience wrapper) ──────────────────────────────── */

export function EditButton({ className, label, ...modalProps }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        type="button"
        className={className || styles.editBtn}
        onClick={() => setOpen(true)}
        title={label || 'Suggest an edit'}
        aria-label={label || 'Suggest an edit'}
      >
        <span className={styles.editBtnIcon}>✏</span>
        {label && <span>{label}</span>}
      </button>
      <EditModal isOpen={open} onClose={() => setOpen(false)} {...modalProps} />
    </>
  );
}

/* ── Inline card edit button (pencil icon only) ──────────────────────── */

export function CardEditButton(props) {
  return (
    <EditButton
      {...props}
      className={styles.cardEditBtn}
      label={null}
    />
  );
}
