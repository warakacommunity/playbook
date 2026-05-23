import { useState } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './podcast.module.css';

/* Episode data — replace placeholders with real episodes as they publish.
   Order within a year: most recent first. */
const EPISODES_BY_YEAR = {
  '2026': [
    {
      number: 4,
      title: 'Building speech datasets for low-resource African languages',
      desc: 'Field recording, speaker recruitment, and quality control — the practical side of building ASR datasets when there is no pre-existing corpus to start from. With a guest researcher from EthioNLP.',
      thumb: null,
      link: '#',
    },
    {
      number: 3,
      title: 'Hausa NLP: where the field stands in 2026',
      desc: 'A walk through the last five years of Hausa NLP — from early word embeddings to current LLM evaluation benchmarks. What works, what is still missing, and what newcomers should read first.',
      thumb: null,
      link: '#',
    },
    {
      number: 2,
      title: 'Annotation as community work, not gig work',
      desc: 'Why treating annotators as collaborators rather than crowd workers changes the quality of African-language datasets. Conversation with a Yoruba Language Lead from the AfriFinder pilot.',
      thumb: null,
      link: '#',
    },
    {
      number: 1,
      title: 'Why African languages still struggle with modern NLP',
      desc: 'In the opening episode, Dr Shamsuddeen Muhammad lays out the data, modelling, and community gaps that hold African-language AI back — and what realistic next steps look like.',
      thumb: null,
      link: '#',
    },
  ],
};

const YEARS = Object.keys(EPISODES_BY_YEAR).sort((a, b) => b - a);

function PlayThumb({ thumb, title }) {
  return (
    <div
      className={styles.thumb}
      style={thumb ? { backgroundImage: `url(${thumb})` } : undefined}
      role="img"
      aria-label={title}
    >
      <span className={styles.playButton} aria-hidden="true">
        <svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor">
          <path d="M8 5v14l11-7z" />
        </svg>
      </span>
    </div>
  );
}

function EpisodeCard({ year, ep }) {
  const inner = (
    <>
      <PlayThumb thumb={ep.thumb} title={ep.title} />
      <div className={styles.epLabel}>{year}, EPISODE {ep.number}</div>
      <div className={styles.epTitle}>{ep.title}</div>
      <p className={styles.epDesc}>{ep.desc}</p>
    </>
  );
  if (ep.link && ep.link !== '#') {
    return (
      <a className={styles.epCard} href={ep.link} target="_blank" rel="noopener noreferrer">
        {inner}
      </a>
    );
  }
  return <div className={styles.epCard}>{inner}</div>;
}

export default function PodcastPage() {
  const [activeYear, setActiveYear] = useState(YEARS[0]);
  const episodes = EPISODES_BY_YEAR[activeYear] || [];

  return (
    <Layout
      title="The Podcast"
      description="An AfricaNLP podcast hosted by Dr Shamsuddeen Muhammad.">
      <main className={styles.main}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className={styles.eyebrow}>The Podcast</div>
          <Heading as="h1" className={styles.heroTitle}>
            Join Dr Shamsuddeen Muhammad as he explores how AI can serve African languages and the communities that speak them.
          </Heading>

          {/* Year filter */}
          <div className={styles.tabs} role="tablist" aria-label="Episode years">
            {YEARS.map((y) => (
              <button
                key={y}
                role="tab"
                aria-selected={activeYear === y}
                className={`${styles.tab} ${activeYear === y ? styles.tabActive : ''}`}
                onClick={() => setActiveYear(y)}
              >
                {y}
              </button>
            ))}
            <button className={styles.tab} disabled>Past episodes</button>
          </div>
        </section>

        {/* Episodes */}
        <section className={styles.yearSection}>
          <div className="container">
            <div className={styles.yearHead}>
              <Heading as="h2" className={styles.yearLabel}>{activeYear}</Heading>
              <div className={styles.yearSub}>
                {episodes.length > 0
                  ? `Conversations with Dr Shamsuddeen Muhammad`
                  : `No episodes yet — check back soon.`}
              </div>
            </div>

            {episodes.length > 0 && (
              <div className={styles.epGrid}>
                {episodes.map((ep) => (
                  <EpisodeCard key={ep.number} year={activeYear} ep={ep} />
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Where to listen */}
        <section className={styles.subscribe}>
          <div className="container">
            <Heading as="h2" className={styles.subscribeTitle}>Listen on your favourite app</Heading>
            <div className={styles.subscribeRow}>
              <a className={styles.subBtn} href="#" target="_blank" rel="noopener noreferrer">Spotify</a>
              <a className={styles.subBtn} href="#" target="_blank" rel="noopener noreferrer">Apple Podcasts</a>
              <a className={styles.subBtn} href="#" target="_blank" rel="noopener noreferrer">YouTube</a>
              <a className={styles.subBtn} href="#" target="_blank" rel="noopener noreferrer">RSS</a>
            </div>
          </div>
        </section>

      </main>
    </Layout>
  );
}
