import React, { useState, useRef, useEffect } from 'react';
import Link from '@docusaurus/Link';
import styles from './StyledNavItem.module.css';

const InfoIcon = () => (
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
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="16" x2="12" y2="12" />
    <line x1="12" y1="8" x2="12.01" y2="8" />
  </svg>
);

const TargetIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
);

const BlogIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
  </svg>
);

const MicIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
    <line x1="12" y1="19" x2="12" y2="23" />
    <line x1="8" y1="23" x2="16" y2="23" />
  </svg>
);

const NewsletterIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
    <polyline points="22,6 12,13 2,6" />
  </svg>
);

const ResearchIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
    <polyline points="14 2 14 8 20 8" />
    <line x1="9" y1="13" x2="15" y2="13" />
    <line x1="9" y1="17" x2="15" y2="17" />
  </svg>
);

const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
  </svg>
);

const ITEMS = [
  {
    icon: TargetIcon,
    title: 'Mission',
    desc: 'Helping AI understand African languages and the cultures behind them.',
    to: '/about',
  },
  {
    icon: BlogIcon,
    title: 'Blog',
    desc: 'News, project updates, and writing about AfricaNLP.',
    to: '/blog',
  },
  {
    icon: MicIcon,
    title: 'Podcast',
    desc: 'A podcast on AfricaNLP hosted by Dr Shamsuddeen Muhammad.',
    to: '/podcast',
  },
  {
    icon: NewsletterIcon,
    title: 'Newsletter',
    desc: 'Monthly roundup of African NLP research, datasets, and events.',
    to: '/newsletter',
  },
  {
    icon: ResearchIcon,
    title: 'Research',
    desc: 'Papers and datasets we contribute to African NLP.',
    to: '/research',
  },
  {
    icon: MailIcon,
    title: 'Contact Us',
    desc: 'We are happy to discuss research, partnerships, and collaboration.',
    href: 'mailto:afriannotate@gmail.com',
  },
];

export default function AboutNavbarItem() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef(null);
  const closeTimerRef = useRef(null);

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
        <span className={styles.btnLabel}>About</span>
        <span className={styles.chevron} aria-hidden="true">{open ? '▲' : '▼'}</span>
      </button>

      {open && (
        <div className={`${styles.dropdown} ${styles.aboutMega}`} role="menu">
          <div className={styles.aboutMegaGrid}>
            {ITEMS.map((it) => {
              const Icon = it.icon;
              const content = (
                <>
                  <span className={styles.aboutMegaItemIcon}><Icon /></span>
                  <span className={styles.aboutMegaItemText}>
                    <span className={styles.aboutMegaItemTitle}>{it.title}</span>
                    <span className={styles.aboutMegaItemDesc}>{it.desc}</span>
                  </span>
                </>
              );
              if (it.href) {
                return (
                  <a
                    key={it.title}
                    href={it.href}
                    target={it.external ? '_blank' : undefined}
                    rel={it.external ? 'noopener noreferrer' : undefined}
                    role="menuitem"
                    className={styles.aboutMegaItem}
                    onClick={close}
                  >
                    {content}
                  </a>
                );
              }
              return (
                <Link
                  key={it.title}
                  to={it.to}
                  role="menuitem"
                  className={styles.aboutMegaItem}
                  onClick={close}
                >
                  {content}
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
