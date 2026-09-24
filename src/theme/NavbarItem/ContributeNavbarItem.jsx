import React, { useState, useRef, useEffect } from 'react';
import Chevron from './Chevron';
import { registerDropdown, openExclusive } from './dropdownBus';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

const BookIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="13"
    height="13"
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

const OnlineIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CloneIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ContributeNavbarItem() {
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
        className={styles.playbookBtn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className={styles.btnLabel}>Contribute</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className={`${styles.dropdown} ${styles.megaMenu} ${styles.megaMenuSingle}`} role="menu">
          <div className={styles.megaSection}>
            <Link
              to="/introduction/how-to-contribute"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><BookIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>How to contribute</span>
                <span className={styles.aboutMegaItemDesc}>What we need and how to get started.</span>
              </span>
            </Link>
            <Link
              to="/?contribute=1"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><OnlineIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>Edit online</span>
                <span className={styles.aboutMegaItemDesc}>Edit chapters in your browser, no setup.</span>
              </span>
            </Link>
            <Link
              to="https://github.com/warakacommunity/playbook"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><CloneIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>Clone on GitHub</span>
                <span className={styles.aboutMegaItemDesc}>Work on the repo locally.</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
