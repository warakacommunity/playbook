import React, { useState, useRef, useEffect } from 'react';
import Chevron from './Chevron';
import Link from '@docusaurus/Link';
import styles from './ContributeButtonNavbarItem.module.css';

const PenIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width="14"
    height="14"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
  >
    <path d="M12 20h9" />
    <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z" />
  </svg>
);

const OnlineIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
);

const CloneIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
  </svg>
);

export default function ContributeButtonNavbarItem() {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const wrapperRef = useRef(null);

  useEffect(() => {
    function handleOutsideClick(e) {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, []);

  if (typeof window === 'undefined') return null;

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <button
        type="button"
        className={styles.contributeBtn}
        onClick={() => setDropdownOpen((v) => !v)}
        aria-haspopup="true"
        aria-expanded={dropdownOpen}
      >
        <PenIcon />
        <span className={styles.btnLabel}>Start Contributing</span>
        <Chevron open={dropdownOpen} />
      </button>

      {dropdownOpen && (
        <div className={styles.dropdown} role="menu">
          <Link
            to="/contribute-online"
            role="menuitem"
            className={styles.dropdownItem}
            onClick={() => setDropdownOpen(false)}
          >
            <span className={styles.dropdownItemIcon}><OnlineIcon /></span>
            Online
          </Link>
          <Link
            to="/contribute"
            role="menuitem"
            className={styles.dropdownItem}
            onClick={() => setDropdownOpen(false)}
          >
            <span className={styles.dropdownItemIcon}><CloneIcon /></span>
            Clone GitHub
          </Link>
        </div>
      )}

    </div>
  );
}
