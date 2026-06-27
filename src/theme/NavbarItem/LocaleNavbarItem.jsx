import React, { useState, useRef, useEffect } from 'react';
import Chevron from './Chevron';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import styles from './SearchNavbarItem.module.css';
import dd from './StyledNavItem.module.css';

// Custom locale switcher. Builds the target URL by stripping ANY stacked locale
// prefixes from the current path before applying the chosen one, so switching
// never produces /pt/sw/am/... — in dev (single-locale server) or production.
export default function LocaleNavbarItem() {
  const { i18n } = useDocusaurusContext();
  const { currentLocale, locales, defaultLocale, localeConfigs } = i18n;
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);

  useEffect(() => {
    function onOutside(e) {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    }
    document.addEventListener('mousedown', onOutside);
    return () => document.removeEventListener('mousedown', onOutside);
  }, []);

  if (typeof window === 'undefined') return null;

  const labelFor = (l) => (localeConfigs && localeConfigs[l] && localeConfigs[l].label) || l;

  const go = (l) => {
    setOpen(false);
    const segs = window.location.pathname.split('/').filter(Boolean);
    while (segs.length && locales.includes(segs[0])) segs.shift();
    const rest = segs.length ? '/' + segs.join('/') : '/';
    const target = (l === defaultLocale ? '' : '/' + l) + rest;
    window.location.href = target + window.location.search + window.location.hash;
  };

  return (
    <div ref={wrapRef} className={dd.wrapper} style={{ position: 'relative' }}>
      <button
        type="button"
        className={styles.iconBtn}
        style={{ width: 'auto', padding: '0.3rem 0.55rem', gap: '0.25rem', fontSize: '0.85rem', fontWeight: 500 }}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span>{labelFor(currentLocale)}</span>
        <Chevron open={open} />
      </button>

      {open && (
        <div className={dd.dropdown} role="menu" style={{ left: 'auto', right: 0, minWidth: 150, padding: '0.35rem', zIndex: 3000 }}>
          {locales.map((l) => (
            <button
              key={l}
              type="button"
              role="menuitem"
              className={dd.dropdownItem}
              style={{
                borderBottom: 'none',
                borderRadius: 6,
                fontWeight: l === currentLocale ? 700 : 600,
                color: l === currentLocale ? 'var(--ifm-color-primary)' : undefined,
              }}
              onClick={() => go(l)}
            >
              {labelFor(l)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
