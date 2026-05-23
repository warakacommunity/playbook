import React from 'react';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

export default function AfriFinderNavbarItem() {
  if (typeof window === 'undefined') return null;

  return (
    <Link to="/afrifinder" className={styles.toolBtn}>
      <span className={styles.btnLabel}>AfriFinder</span>
    </Link>
  );
}
