import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="15"
    height="15"
    fill="none"
    stroke="currentColor"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const DownloadIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
    <polyline points="7 10 12 15 17 10" />
    <line x1="12" y1="15" x2="12" y2="3" />
  </svg>
);

const ReadIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

export default function PlaybookNavbarItem() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.playbookBtn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <BookIcon />
        <span className={styles.btnLabel}>MasakhanePlaybook</span>
        <span className={styles.chevron} aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={styles.dropdown} role="menu">
          <Link
            to="/playbook/"
            role="menuitem"
            className={styles.dropdownItem}
            onClick={() => setOpen(false)}
          >
            <ReadIcon /> Read online
          </Link>
          <a
            href="/MasakhanePlaybook/downloads/masakhane-playbook.pdf"
            role="menuitem"
            className={styles.dropdownItem}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
          >
            <DownloadIcon /> Download PDF
          </a>
        </div>
      )}
    </div>
  );
}
