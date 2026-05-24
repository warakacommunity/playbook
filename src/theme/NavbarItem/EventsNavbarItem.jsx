import React from 'react';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

export default function EventsNavbarItem() {
  if (typeof window === 'undefined') return null;

  return (
    <Link to="/workshops" className={styles.toolBtn}>
      <span className={styles.btnLabel}>Events</span>
    </Link>
  );
}
