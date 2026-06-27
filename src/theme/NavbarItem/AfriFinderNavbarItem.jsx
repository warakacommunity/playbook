import React, { useState, useRef, useEffect } from 'react';
import Chevron from './Chevron';
import { registerDropdown, openExclusive } from './dropdownBus';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

const TaskIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 11l3 3L22 4" />
    <path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11" />
  </svg>
);

const AnnotatorIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const SearchIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="8" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

const ProfileIcon = () => (
  <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

export default function AfriFinderNavbarItem() {
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
        className={styles.aboutBtn}
        onClick={() => setOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={open}
      >
        <span className={styles.btnLabel}>AfriFinder</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className={`${styles.dropdown} ${styles.megaMenu}`} role="menu">
          <div className={styles.megaSection}>
            <div className={styles.megaSectionTitle}>Annotation Marketplace</div>
            <Link
              to="/afrifinder#marketplace"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><TaskIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>Post a task</span>
                <span className={styles.aboutMegaItemDesc}>For researchers, companies, and NGOs hiring annotators in African languages.</span>
              </span>
            </Link>
            <Link
              to="/afrifinder#marketplace"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><AnnotatorIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>Become an annotator</span>
                <span className={styles.aboutMegaItemDesc}>For native speakers and linguists who want to take on paid annotation work.</span>
              </span>
            </Link>
          </div>

          <div className={styles.megaDivider} aria-hidden="true" />

          <div className={styles.megaSection}>
            <div className={styles.megaSectionTitle}>Expert Directory</div>
            <Link
              to="/afrifinder#directory"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><SearchIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>Find experts</span>
                <span className={styles.aboutMegaItemDesc}>Search researchers and linguists by language, NLP domain, and region.</span>
              </span>
            </Link>
            <Link
              to="/afrifinder#directory"
              role="menuitem"
              className={styles.aboutMegaItem}
              onClick={close}
            >
              <span className={styles.aboutMegaItemIcon}><ProfileIcon /></span>
              <span className={styles.aboutMegaItemText}>
                <span className={styles.aboutMegaItemTitle}>Join the directory</span>
                <span className={styles.aboutMegaItemDesc}>For researchers, engineers, and linguists open to collaboration.</span>
              </span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
