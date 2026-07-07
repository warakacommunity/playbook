/**
 * Per-page citation modal. Opened from the "Cite this page" link in
 * DocItem/Footer. Renders the current page's citation in four common
 * academic formats (BibTeX, APA, MLA, Chicago) with a copy button per
 * format and a link out to /cite for the whole-playbook citation.
 *
 * Fields are filled from the doc metadata (title, permalink) and the
 * current browser URL; the modal is client-only (mounted with the
 * button click, unmounted on close), so SSR does not run the URL /
 * date reads.
 */
import React, { useEffect, useMemo, useState, useCallback } from 'react';
import styles from './styles.module.css';

const FORMATS = [
  { key: 'bibtex', label: 'BibTeX' },
  { key: 'apa', label: 'APA' },
  { key: 'mla', label: 'MLA' },
  { key: 'chicago', label: 'Chicago' },
];

function buildCitations({ title, url, year, accessed, bibkey }) {
  const displayUrl = url.replace(/^https?:\/\//, '');
  return {
    bibtex:
      `@misc{Masakhane_AfriPlaybook_${bibkey},\n` +
      `  title        = {${title}},\n` +
      `  author       = {{Masakhane Community}},\n` +
      `  booktitle    = {AfriPlaybook: A Community-Driven Playbook for African-Language NLP},\n` +
      `  year         = {${year}},\n` +
      `  url          = {${url}},\n` +
      `  urldate      = {${accessed}},\n` +
      `  publisher    = {Masakhane}\n` +
      `}`,
    apa:
      `Masakhane Community. (${year}). ${title}. In AfriPlaybook: A Community-Driven Playbook for African-Language NLP. Retrieved ${accessed}, from ${url}`,
    mla:
      `Masakhane Community. "${title}." AfriPlaybook: A Community-Driven Playbook for African-Language NLP, ${year}, ${displayUrl}. Accessed ${accessed}.`,
    chicago:
      `Masakhane Community. "${title}." AfriPlaybook: A Community-Driven Playbook for African-Language NLP. ${year}. ${url}.`,
  };
}

function slugifyForBibkey(permalink) {
  if (!permalink) return 'root';
  const cleaned = permalink
    .replace(/^\/+|\/+$/g, '')
    .replace(/[^a-zA-Z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  return cleaned || 'root';
}

export default function CitationModal({ metadata, onClose }) {
  const [format, setFormat] = useState('bibtex');
  const [copied, setCopied] = useState(false);

  const url =
    typeof window !== 'undefined' ? window.location.href.split('#')[0] : '';
  const now = typeof window !== 'undefined' ? new Date() : null;
  const year = now ? now.getFullYear() : new Date().getFullYear();
  const accessed = now ? now.toISOString().slice(0, 10) : '';
  const title = metadata?.title || 'AfriPlaybook';
  const bibkey = slugifyForBibkey(metadata?.permalink);

  const citations = useMemo(
    () => buildCitations({ title, url, year, accessed, bibkey }),
    [title, url, year, accessed, bibkey],
  );

  const currentText = citations[format];

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(currentText);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Fallback for browsers without clipboard API — select the pre and
      // let the user copy manually. Modern browsers on served https should
      // all have the API; the catch is defensive.
    }
  }, [currentText]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    // Prevent background scroll while modal is open.
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [onClose]);

  return (
    <div
      className={styles.overlay}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="cite-modal-title"
    >
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 id="cite-modal-title" className={styles.title}>
            Cite this page
          </h2>
          <button
            type="button"
            onClick={onClose}
            className={styles.closeBtn}
            aria-label="Close citation dialog"
          >
            ×
          </button>
        </div>

        <div className={styles.pageInfo}>
          <div className={styles.pageInfoTitle}>{title}</div>
          <div className={styles.pageInfoUrl}>{url}</div>
        </div>

        <div className={styles.tabs} role="tablist" aria-label="Citation format">
          {FORMATS.map(({ key, label }) => (
            <button
              type="button"
              key={key}
              role="tab"
              aria-selected={format === key}
              className={
                format === key ? styles.tabActive : styles.tab
              }
              onClick={() => {
                setFormat(key);
                setCopied(false);
              }}
            >
              {label}
            </button>
          ))}
        </div>

        <pre className={styles.citation} aria-live="polite">
          {currentText}
        </pre>

        <div className={styles.actions}>
          <button
            type="button"
            onClick={handleCopy}
            className={styles.copyBtn}
          >
            {copied ? '✓ Copied' : 'Copy'}
          </button>
          <a
            href="/cite"
            className={styles.fullCite}
            onClick={onClose}
          >
            Whole-playbook citation →
          </a>
        </div>
      </div>
    </div>
  );
}
