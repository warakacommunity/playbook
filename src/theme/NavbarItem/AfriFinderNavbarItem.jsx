import React from 'react';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

const CompassIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
  </svg>
);

export default function AfriFinderNavbarItem() {
  if (typeof window === 'undefined') return null;

  return (
    <Link to="/afrifinder" className={styles.toolBtn}>
      <CompassIcon />
      <span className={styles.btnLabel}>AfriFinder</span>
    </Link>
  );
}
