import React, { useState, useRef, useEffect } from 'react';
import Chevron from './Chevron';
import { registerDropdown, openExclusive } from './dropdownBus';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

const AppIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="3" width="18" height="18" rx="2" />
    <path d="M3 9h18M9 21V9" />
  </svg>
);

const DocsIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

export default function ToolNavbarItem() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const closeTimerRef = useRef(null);
  const selfCloser = useRef(() => setOpen(false));
  useEffect(() => registerDropdown(selfCloser.current), []);

  useEffect(() => {
    function handleOutside(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutside);
    return () => {
      document.removeEventListener('mousedown', handleOutside);
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  if (typeof window === 'undefined') return null;

  const close = () => setOpen(false);
  const handleEnter = () => {
    if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    openExclusive(selfCloser.current);
    setOpen(true);
  };
  const handleLeave = () => {
    closeTimerRef.current = setTimeout(() => setOpen(false), 150);
  };

  return (
    <div
      ref={wrapperRef}
      className={styles.wrapper}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <button
        type="button"
        className={styles.toolBtn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className={styles.btnLabel}>AfriAnnotate</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className={styles.dropdown} role="menu" style={{ width: 320, padding: '0.5rem', zIndex: 3000 }}>
          <Link
            to="/tool"
            role="menuitem"
            className={styles.aboutMegaItem}
            onClick={close}
          >
            <span className={styles.aboutMegaItemIcon}><AppIcon /></span>
            <span className={styles.aboutMegaItemText}>
              <span className={styles.aboutMegaItemTitle}>The tool</span>
              <span className={styles.aboutMegaItemDesc}>What AfriAnnotate is and how to get started.</span>
            </span>
          </Link>
          <a
            href="https://docs.afriannotate.org"
            role="menuitem"
            className={styles.aboutMegaItem}
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
          >
            <span className={styles.aboutMegaItemIcon}><DocsIcon /></span>
            <span className={styles.aboutMegaItemText}>
              <span className={styles.aboutMegaItemTitle}>Documentation</span>
              <span className={styles.aboutMegaItemDesc}>Guides and reference at docs.afriannotate.org.</span>
            </span>
          </a>
        </div>
      )}
    </div>
  );
}
