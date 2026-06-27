import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { useHistory } from '@docusaurus/router';
import styles from './SearchNavbarItem.module.css';

const Glass = ({ size = 18 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size} fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="11" cy="11" r="7" />
    <line x1="21" y1="21" x2="16.65" y2="16.65" />
  </svg>
);

export default function SearchNavbarItem() {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [coords, setCoords] = useState({ top: 0, right: 0 });
  const btnRef = useRef(null);
  const popRef = useRef(null);
  const inputRef = useRef(null);
  const history = useHistory();

  const place = () => {
    if (!btnRef.current) return;
    const r = btnRef.current.getBoundingClientRect();
    setCoords({ top: r.bottom + 14, right: Math.max(8, window.innerWidth - r.right) });
  };

  const openSearch = () => {
    place();
    setOpen(true);
  };

  useEffect(() => {
    function onOutside(e) {
      if (
        btnRef.current && !btnRef.current.contains(e.target) &&
        popRef.current && !popRef.current.contains(e.target)
      ) {
        setOpen(false);
      }
    }
    function onKey(e) {
      if (e.key === 'Escape') setOpen(false);
    }
    function onReflow() {
      if (open) place();
    }
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    window.addEventListener('resize', onReflow);
    window.addEventListener('scroll', onReflow, true);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
      window.removeEventListener('resize', onReflow);
      window.removeEventListener('scroll', onReflow, true);
    };
  }, [open]);

  useEffect(() => {
    if (open && inputRef.current) inputRef.current.focus();
  }, [open]);

  if (typeof window === 'undefined') return null;

  const submit = (e) => {
    e.preventDefault();
    const term = q.trim();
    if (!term) return;
    setOpen(false);
    history.push(`/search?q=${encodeURIComponent(term)}`);
  };

  return (
    <div className={styles.wrap}>
      <button
        ref={btnRef}
        type="button"
        className={styles.iconBtn}
        aria-label="Search"
        aria-expanded={open}
        onClick={() => (open ? setOpen(false) : openSearch())}
      >
        <Glass />
      </button>

      {open &&
        ReactDOM.createPortal(
          <form
            ref={popRef}
            className={styles.pop}
            onSubmit={submit}
            role="search"
            style={{ position: 'fixed', top: coords.top, right: coords.right }}
          >
            <span className={styles.popIcon}><Glass size={16} /></span>
            <input
              ref={inputRef}
              className={styles.input}
              type="search"
              placeholder="Search the playbook…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
          </form>,
          document.body,
        )}
    </div>
  );
}
