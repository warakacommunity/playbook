import React, { useState, useRef, useEffect, useCallback } from 'react';
import Link from '@docusaurus/Link';
import Chevron from './Chevron';
import { registerDropdown, openExclusive } from './dropdownBus';
import dd from './StyledNavItem.module.css';
import { IconBookOpen, IconNewspaper, IconUsers, IconFileText, IconClipboardCheck, IconRocket } from '@site/src/components/Icons';

const SECTIONS = [
  {
    title: 'Learn',
    items: [
      { to: '/blog', label: 'Blog', desc: 'News, calls, and essays from the community.', Icon: IconNewspaper },
      { to: '/glossary', label: 'Glossary', desc: 'Definitions of terms used in the playbook.', Icon: IconBookOpen },
      { to: '/templates', label: 'Templates', desc: 'Guidelines, cards, and forms to copy.', Icon: IconFileText },
    ],
  },
  {
    title: 'Community',
    items: [
      { href: 'https://waraka.org', label: 'Waraka Community', desc: 'The community behind this playbook.', Icon: IconUsers },
      { href: 'https://docs.afriannotate.org/', label: 'AfriAnnotate', desc: 'Annotation platform for African languages.', Icon: IconClipboardCheck },
      { href: 'https://www.waraka.ai', label: 'Waraka Enterprise', desc: 'Commercial services from Waraka.', Icon: IconRocket },
    ],
  },
];

// Hamburger drawer (≤996px): Docusaurus renders left items here with mobile=true.
function MobileList() {
  return (
    <li className="menu__list-item">
      <div className="menu__link" style={{ fontWeight: 700, cursor: 'default' }}>Resources</div>
      <ul className="menu__list">
        {SECTIONS.flatMap((s) => s.items).map(({ to, href, label }) => (
          <li key={label} className="menu__list-item">
            <Link to={to} href={href} className="menu__link">{label}{href && ' ↗'}</Link>
          </li>
        ))}
      </ul>
    </li>
  );
}

export default function ResourcesNavbarItem({ mobile }) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef(null);
  // Stable identity: dropdownBus compares closers by reference.
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => registerDropdown(close), []);
  useEffect(() => {
    const onOutside = (e) => wrapRef.current && !wrapRef.current.contains(e.target) && close();
    const onKey = (e) => e.key === 'Escape' && close();
    document.addEventListener('mousedown', onOutside);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onOutside);
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  if (mobile) return <MobileList />;

  const toggle = () => setOpen((v) => { if (!v) openExclusive(close); return !v; });

  return (
    // navbar__item: Docusaurus hides it in the bar on mobile; the drawer shows MobileList instead.
    <div ref={wrapRef} className={`navbar__item ${dd.wrapper}`}>
      <button
        type="button"
        className={`navbar__link ${dd.menuBtn}${open ? ' ' + dd.menuBtnOpen : ''}`}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={toggle}
      >
        Resources <Chevron open={open} />
      </button>
      {open && (
        <div className={`${dd.dropdown} ${dd.megaMenu}`}>
          {SECTIONS.map((s, i) => (
            <React.Fragment key={s.title}>
              {i > 0 && <div className={dd.megaDivider} />}
              <div className={dd.megaSection}>
                <div className={dd.megaSectionTitle}>{s.title}</div>
                {s.items.map(({ to, href, label, desc, Icon }) => (
                  <Link key={label} to={to} href={href} className={dd.aboutMegaItem} onClick={close}>
                    <span className={dd.aboutMegaItemIcon}><Icon /></span>
                    <span className={dd.aboutMegaItemText}>
                      <span className={dd.aboutMegaItemTitle}>{label}{href && ' ↗'}</span>
                      <span className={dd.aboutMegaItemDesc}>{desc}</span>
                    </span>
                  </Link>
                ))}
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
}
