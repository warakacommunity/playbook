import { useState, useMemo } from 'react';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './research.module.css';

/* Publications data. Edit this array as new papers ship.
   Fields: type, date (YYYY-MM), title, desc, venue, tags, url */
const PUBLICATIONS = [
  {
    type: 'Research Paper',
    date: '2025-07',
    title: 'BRIGHTER: BRIdging the Gap in Human-Annotated Textual Emotion Recognition Datasets for 28 Languages',
    venue: 'ACL 2025',
    desc: 'A human-annotated emotion-recognition dataset covering 28 languages — including several low-resource African languages — with labels for joy, sadness, anger, fear, surprise, and disgust.',
    tags: ['Emotion', 'Multilingual', 'African Languages'],
    url: 'https://aclanthology.org/2025.acl-long.436.pdf',
  },
  {
    type: 'Research Paper',
    date: '2026-05',
    title: 'Going PLACES: Participatory Localized Red Teaming for Text-to-Image Safety in the Global South',
    venue: 'arXiv',
    desc: 'A participatory red-teaming methodology for text-to-image safety evaluation grounded in Global South contexts, surfacing harms that generic Western-centric pipelines miss.',
    tags: ['T2I Safety', 'Red Teaming', 'Global South'],
    url: 'https://arxiv.org/abs/2605.19190',
  },
  {
    type: 'Survey',
    date: '2025-09',
    title: 'The Rise of AfricaNLP: A Survey of Contributions, Contributors, Community Impact, and Bibliometric Analysis',
    venue: 'arXiv',
    desc: 'A bibliometric survey of the African NLP research landscape — who contributes, where the work is published, and how the field has grown.',
    tags: ['Survey', 'Bibliometrics', 'AfricaNLP'],
    url: 'https://arxiv.org/pdf/2509.25477',
  },
  {
    type: 'Survey',
    date: '2025-10',
    title: 'Automatic Speech Recognition (ASR) for African Low-Resource Languages: A Systematic Literature Review',
    venue: 'arXiv',
    desc: 'A systematic review of ASR research for low-resource African languages — data, models, evaluation gaps, and open problems for the community to take on.',
    tags: ['ASR', 'Low-Resource', 'Literature Review'],
    url: 'https://ui.adsabs.harvard.edu/abs/2025arXiv251001145H/abstract',
  },
  {
    type: 'Research Paper',
    date: '2026-04',
    title: 'AFRILANGTUTOR: Advancing Language Tutoring and Culture Education in Low-Resource Languages with Large Language Models',
    venue: 'arXiv',
    desc: 'An LLM-driven language tutor for low-resource African languages, designed around the cultural context of learners as well as the linguistic content.',
    tags: ['LLM', 'Education', 'Low-Resource'],
    url: 'https://ui.adsabs.harvard.edu/abs/2026arXiv260420996D/abstract',
  },
  {
    type: 'Research Paper',
    date: '2026-05',
    title: 'Beyond Majority Voting: Agreement-Based Clustering to Model Annotator Perspectives in Subjective NLP Tasks',
    venue: 'arXiv',
    desc: 'An agreement-based clustering method for subjective annotation tasks that preserves disagreement signal instead of collapsing it under majority voting.',
    tags: ['Annotation', 'Perspectivism', 'Subjective NLP'],
    url: 'https://arxiv.org/pdf/2605.09955',
  },
  {
    type: 'Research Paper',
    date: '2023-12',
    title: 'AfriSenti: A Twitter Sentiment Analysis Benchmark for African Languages',
    venue: 'EMNLP 2023',
    desc: 'A sentiment-analysis benchmark covering 14 African languages, built with native-speaker annotators and released openly. Used as the basis for SemEval-2023 Task 12.',
    tags: ['Sentiment', 'Benchmark', 'African Languages'],
    url: 'https://aclanthology.org/2023.emnlp-main.862.pdf',
  },
  {
    type: 'Research Paper',
    date: '2026-04',
    title: 'Full Fine-Tuning vs. Parameter-Efficient Adaptation for Low-Resource African ASR: A Controlled Study with Whisper-Small',
    venue: 'AfricaNLP 2026',
    desc: 'A controlled comparison of full fine-tuning vs. parameter-efficient adaptation (LoRA-style) for adapting Whisper-Small to low-resource African languages.',
    tags: ['ASR', 'Whisper', 'Fine-Tuning'],
    url: 'https://aclanthology.org/2026.africanlp-main.19.pdf',
  },
  {
    type: 'Research Paper',
    date: '2026-04',
    title: 'NaijaS2ST: A Multi-Accent Benchmark for Speech-to-Speech Translation in Low-Resource Nigerian Languages',
    venue: 'arXiv',
    desc: 'A multi-accent benchmark for speech-to-speech translation across low-resource Nigerian languages, capturing the accent diversity found in real Nigerian speech.',
    tags: ['Speech-to-Speech', 'Benchmark', 'Nigerian Languages'],
    url: 'https://arxiv.org/abs/2604.16287',
  },
  {
    type: 'Research Paper',
    date: '2026-04',
    title: 'Building a Conversational AI Assistant for African Travel Services with LLMs and RAG',
    venue: 'AfricaNLP 2026',
    desc: 'An LLM + retrieval-augmented generation pipeline for an African travel-services assistant, with attention to domain grounding and language coverage.',
    tags: ['LLM', 'RAG', 'Conversational AI'],
    url: 'https://aclanthology.org/2026.africanlp-main.16.pdf',
  },
  {
    type: 'Research Paper',
    date: '2026-01',
    title: 'DimABSA: Building Multilingual and Multidomain Datasets for Dimensional Aspect-Based Sentiment Analysis',
    venue: 'arXiv',
    desc: 'Multilingual, multi-domain datasets for dimensional aspect-based sentiment analysis — moving beyond polarity labels to finer-grained sentiment dimensions.',
    tags: ['Sentiment', 'ABSA', 'Multilingual'],
    url: 'https://arxiv.org/pdf/2601.23022',
  },
  {
    type: 'Research Paper',
    date: '2026-01',
    title: 'DimStance: Multilingual Datasets for Dimensional Stance Analysis',
    venue: 'arXiv',
    desc: 'Multilingual stance-analysis datasets that decompose stance into finer dimensions rather than reducing it to a single agree/disagree label.',
    tags: ['Stance', 'Multilingual', 'Datasets'],
    url: 'https://arxiv.org/pdf/2601.21483',
  },
  {
    type: 'Research Paper',
    date: '2026-01',
    title: 'CommonLID: Re-evaluating State-of-the-Art Language Identification Performance on Web Data',
    venue: 'arXiv',
    desc: 'A re-evaluation of state-of-the-art language identification systems against realistic web data, exposing where current LID models silently fail.',
    tags: ['LID', 'Evaluation', 'Web Data'],
    url: 'https://arxiv.org/pdf/2601.18026',
  },
  {
    type: 'Survey',
    date: '2025-06',
    title: 'Automatic Speech Recognition for African Low-Resource Languages: Challenges and Future Directions',
    venue: 'AfricaNLP 2025',
    desc: 'A position paper on the state of ASR for African low-resource languages — what is blocking progress and where the community should focus next.',
    tags: ['ASR', 'African Languages', 'Position Paper'],
    url: 'https://aclanthology.org/2025.africanlp-1.13.pdf',
  },
  {
    type: 'Survey',
    date: '2025-06',
    title: 'HausaNLP: Current Status, Challenges and Future Directions for Hausa Natural Language Processing',
    venue: 'AfricaNLP 2025',
    desc: 'A survey of Hausa NLP research — datasets, models, and open challenges — written as a roadmap for researchers entering the area.',
    tags: ['Hausa', 'Survey', 'AfricaNLP'],
    url: 'https://aclanthology.org/2025.africanlp-1.27.pdf',
  },
  {
    type: 'Survey',
    date: '2025-06',
    title: 'The State of Large Language Models for African Languages: Progress and Challenges',
    venue: 'arXiv',
    desc: 'A survey of where current large language models stand on African languages — what works, what fails, and what the open research problems are.',
    tags: ['LLM', 'African Languages', 'Survey'],
    url: 'https://arxiv.org/pdf/2506.02280',
  },
  {
    type: 'Research Paper',
    date: '2025-05',
    title: 'POLAR: A Benchmark for Multilingual, Multicultural, and Multi-Event Online Polarization',
    venue: 'arXiv',
    desc: 'A benchmark for studying online polarization across multiple languages, cultures, and events — moving beyond single-language polarization research.',
    tags: ['Polarization', 'Benchmark', 'Multilingual'],
    url: 'https://arxiv.org/pdf/2505.20624',
  },
  {
    type: 'Research Paper',
    date: '2025-04',
    title: 'AfriHate: A Multilingual Collection of Hate Speech and Abusive Language Datasets for African Languages',
    venue: 'NAACL 2025',
    desc: 'A community-built hate-speech and abusive-language corpus across multiple African languages, with culturally grounded annotation guidelines reviewed by speakers from each language community.',
    tags: ['Hate Speech', 'Multilingual', 'African Languages'],
    url: 'https://aclanthology.org/2025.naacl-long.92.pdf',
  },
  {
    type: 'Research Paper',
    date: '2025-11',
    title: 'AfroXLMR-Social: Adapting Pre-trained Language Models for African Languages Social Media Text',
    venue: 'Findings of EMNLP 2025',
    desc: 'Domain-adaptive pretraining of multilingual models on African-language social media text, improving downstream performance on noisy real-world inputs.',
    tags: ['Pretrained Models', 'Social Media', 'African Languages'],
    url: 'https://aclanthology.org/anthology-files/pdf/findings/2025.findings-emnlp.842.pdf',
  },
  {
    type: 'Research Paper',
    date: '2024-12',
    title: 'BLEnD: A Benchmark for LLMs on Everyday Knowledge in Diverse Cultures and Languages',
    venue: 'NeurIPS 2024',
    desc: 'A benchmark that probes large language models on everyday cultural knowledge across diverse languages and cultures — revealing where LLMs default to a Western prior.',
    tags: ['LLM', 'Cultural Knowledge', 'Benchmark'],
    url: 'https://proceedings.neurips.cc/paper_files/paper/2024/file/8eb88844dafefa92a26aaec9f3acad93-Paper-Datasets_and_Benchmarks_Track.pdf',
  },
];

const TYPES = ['All Publications', 'Research Paper', 'Survey'];

function formatDate(iso) {
  const [y, m] = iso.split('-');
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  return `${months[Number(m) - 1]} ${y}`;
}

function PublicationCard({ p }) {
  return (
    <a className={styles.card} href={p.url} target="_blank" rel="noopener noreferrer">
      <div className={styles.cardHead}>
        <span className={styles.typeBadge}>{p.type}</span>
        <span className={styles.cardDate}>{formatDate(p.date)}</span>
      </div>
      <h3 className={styles.cardTitle}>{p.title}</h3>
      <div className={styles.cardVenue}>{p.venue}</div>
      <p className={styles.cardDesc}>{p.desc}</p>
      <div className={styles.cardTags}>
        {p.tags.map((t, i) => <span key={i} className={styles.tag}>{t}</span>)}
      </div>
    </a>
  );
}

export default function ResearchPage() {
  const [activeType, setActiveType] = useState('All Publications');
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    return PUBLICATIONS.filter((p) => {
      if (activeType !== 'All Publications' && p.type !== activeType) return false;
      if (query.trim()) {
        const q = query.trim().toLowerCase();
        const hay = `${p.title} ${p.desc} ${p.venue} ${p.tags.join(' ')}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    }).sort((a, b) => b.date.localeCompare(a.date));
  }, [activeType, query]);

  return (
    <Layout
      title="Research & Publications"
      description="Papers, datasets, and surveys we contribute to African NLP.">
      <main className={styles.page}>

        {/* Hero */}
        <section className={styles.hero}>
          <div className="container">
            <Heading as="h1" className={styles.title}>
              Research <span className={styles.titleAccent}>&amp; Publications</span>
            </Heading>
            <p className={styles.subtitle}>
              Papers, datasets, and surveys we contribute to African NLP —
              built with native-speaker communities and released openly.
            </p>

            <div className={styles.searchWrap}>
              <span className={styles.searchIcon} aria-hidden="true">
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <input
                type="search"
                className={styles.searchInput}
                placeholder="Search publications, authors, or topics..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Search publications"
              />
            </div>

            <div className={styles.filters} role="tablist" aria-label="Publication type">
              {TYPES.map((t) => (
                <button
                  key={t}
                  role="tab"
                  aria-selected={activeType === t}
                  className={`${styles.filterPill} ${activeType === t ? styles.filterPillActive : ''}`}
                  onClick={() => setActiveType(t)}
                >
                  {t}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* Results */}
        <section className={styles.results}>
          <div className="container">
            <div className={styles.resultsHead}>
              <Heading as="h2" className={styles.resultsTitle}>{activeType}</Heading>
              <p className={styles.resultsCount}>
                {filtered.length} {filtered.length === 1 ? 'publication' : 'publications'} found
              </p>
            </div>

            {filtered.length > 0 ? (
              <div className={styles.grid}>
                {filtered.map((p, i) => <PublicationCard key={i} p={p} />)}
              </div>
            ) : (
              <div className={styles.empty}>
                No publications match this filter.
              </div>
            )}
          </div>
        </section>

      </main>
    </Layout>
  );
}
