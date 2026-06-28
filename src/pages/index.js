import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import {
  IconArrowRight,
  IconBookOpen,
  IconFileText,
  IconMic,
  IconImage,
  IconShieldCheck,
} from '@site/src/components/Icons';
import '../css/landing.css';

// "What's inside" — each card links into a real chapter slug. These slugs are
// served at the domain root because the docs plugin uses routeBasePath: "/".
const INSIDE = [
  {
    icon: <IconBookOpen size={26} />,
    tag: 'Foundations',
    title: 'Start with the principles',
    text: 'Why African-language data has to be built with its speakers, the core principles that run through every chapter, and how to read (and contribute to) the handbook.',
    to: '/introduction',
  },
  {
    icon: <IconFileText size={26} />,
    tag: 'Modality guides',
    title: 'Text, speech & vision',
    text: 'Sourcing, collecting, and annotating each modality — from scraping and APIs for text, to recording and transcribing speech, to image and video data.',
    to: '/data-collection/data-modalities',
  },
  {
    icon: <IconShieldCheck size={26} />,
    tag: 'Quality & governance',
    title: 'Get the data right',
    text: 'Inter-annotator agreement, quality control, ethics and bias, consent, ownership, and licensing — so the data you build can be trusted and reused.',
    to: '/data-quality',
  },
  {
    icon: <IconImage size={26} />,
    tag: 'Documentation',
    title: 'Document & release',
    text: 'Data statements, datasheets, contributor agreements, storage, and a sustainability plan — everything needed to release a dataset responsibly.',
    to: '/documentation/documentation',
  },
];

export default function Home() {
  const mark = useBaseUrl('/img/playbook-mark.svg');

  return (
    <Layout
      title="Waraka Playbook — a community handbook for building African-language datasets"
      description="The Waraka Playbook is an open, community-owned handbook for building high-quality datasets for African languages — covering text, speech, and vision, from collection to a documented release.">
      <Head>
        <body className="lp-host" />
      </Head>
      <div className="lp-page">

        {/* ============ HERO — the book cover ============ */}
        <header className="lp-hero-brand">
          <div className="lp-hero-fold">
            <img className="lp-hero-bg" src={mark} alt="" aria-hidden="true" />
            <div className="lp-wrap lp-hero-center">
              <img
                className="lp-hero-logo lp-anim lp-d1"
                src={mark}
                alt="Waraka Playbook"
                style={{ height: 'clamp(72px, 9vw, 110px)' }}
              />
              <span className="lp-eyebrow lp-anim lp-d1" style={{ marginBottom: '0.4rem' }}>
                Community handbook
              </span>
              <div className="lp-tickframe lp-anim lp-d2">
                <span className="lp-tick lp-tick-tl" />
                <span className="lp-tick lp-tick-tr" />
                <span className="lp-tick lp-tick-bl" />
                <span className="lp-tick lp-tick-br" />
                <h1 className="lp-h1">
                  Waraka <em>Playbook</em>
                </h1>
              </div>
              <p className="lp-lead lp-anim lp-d3">
                A community handbook for building African-language datasets.
              </p>
              <p className="lp-body lp-anim lp-d3" style={{ textAlign: 'center', margin: '0.9rem auto 0' }}>
                A practical, open guide to collecting, annotating, and releasing
                high-quality data for African languages — across text, speech,
                and vision — written and maintained by the community that speaks
                them.
              </p>
              <div className="lp-cta-row lp-anim lp-d4">
                <a className="lp-btn lp-btn-primary" href={useBaseUrl('/introduction')}>
                  Read online <IconArrowRight size={18} />
                </a>
                <a
                  className="lp-btn lp-btn-ghost"
                  href={useBaseUrl('/downloads/masakhane-playbook.pdf')}
                  target="_blank"
                  rel="noopener noreferrer">
                  Download PDF
                </a>
              </div>
              <div className="lp-hero-stats lp-anim lp-d5">
                <div>
                  <div className="lp-stat-num">3</div>
                  <div className="lp-stat-label">modalities — text, speech, vision</div>
                </div>
                <div>
                  <div className="lp-stat-num">6</div>
                  <div className="lp-stat-label">languages</div>
                </div>
                <div>
                  <div className="lp-stat-num">Open</div>
                  <div className="lp-stat-label">source &amp; community-owned</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* ============ WHAT'S INSIDE ============ */}
        <section className="lp-section">
          <div className="lp-wrap">
            <span className="lp-section-kicker">What&rsquo;s inside</span>
            <h2 className="lp-h2">
              From a blank page to a <em>documented dataset</em>
            </h2>
            <p className="lp-body">
              The handbook walks the whole pipeline — start with the
              foundations, follow the guide for your modality, get the quality
              and governance right, then document and release. Jump in wherever
              you are.
            </p>
            <div className="lp-feature-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
              {INSIDE.map((c) => (
                <a
                  key={c.title}
                  href={useBaseUrl(c.to)}
                  className="lp-feature-card"
                  style={{ textDecoration: 'none', color: 'inherit', display: 'block' }}>
                  <div className="lp-feature-top">
                    <span className="lp-feature-icon">{c.icon}</span>
                    <span className="lp-badge">{c.tag}</span>
                  </div>
                  <h3 className="lp-feature-h">{c.title}</h3>
                  <p className="lp-feature-p">{c.text}</p>
                </a>
              ))}
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="lp-section" style={{ paddingTop: 0 }}>
          <div className="lp-final">
            <span className="lp-section-kicker">Open &amp; community-owned</span>
            <h2 className="lp-h2">Read it, use it, help build it.</h2>
            <p className="lp-lead">
              The Waraka Playbook is free to read online and open to contributions.
              Fixing an error, translating a page, or sharing what worked on a
              real project all count.
            </p>
            <div className="lp-cta-row">
              <a className="lp-btn lp-btn-primary" href={useBaseUrl('/introduction')}>
                Read online <IconArrowRight size={18} />
              </a>
              <a
                className="lp-btn lp-btn-ghost"
                href={useBaseUrl('/downloads/masakhane-playbook.pdf')}
                target="_blank"
                rel="noopener noreferrer">
                Download PDF
              </a>
            </div>
          </div>
        </section>

      </div>
    </Layout>
  );
}
