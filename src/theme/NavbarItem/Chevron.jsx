import React from 'react';
import styles from './StyledNavItem.module.css';

// Small stroke chevron used by the dropdown nav items; rotates 180° when open.
export default function Chevron({ open }) {
  return (
    <svg
      className={`${styles.chevron}${open ? ' ' + styles.chevronOpen : ''}`}
      width="11"
      height="11"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}
