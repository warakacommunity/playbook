import React from 'react';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

export default function ToolNavbarItem() {
  if (typeof window === 'undefined') return null;

  return (
    <Link to="/tool" className={styles.toolBtn}>
      <span className={styles.btnLabel}>AfriAnnotate</span>
    </Link>
  );
}
