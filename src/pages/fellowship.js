import Layout from '@theme/Layout';
import useBaseUrl from '@docusaurus/useBaseUrl';
import Head from '@docusaurus/Head';
import {
  IconUsers,
  IconCheckCircle,
  IconArrowRight,
  IconShieldCheck,
  IconSparkles,
  IconRocket,
  IconBookOpen,
  IconHeart,
  IconCalendar,
} from '@site/src/components/Icons';
import '../css/landing.css';

// What a fellow gets out of the program.
const BENEFITS = [
  {
    icon: <IconUsers size={26} />,
    tag: 'Mentorship',
    title: 'One-to-one with an experienced researcher',
    text: 'You are paired with a mentor from a leading lab or university who meets you regularly, reviews your work, and guides the research from question to paper.',
  },
  {
    icon: <IconRocket size={26} />,
    tag: 'Research',
    title: 'A real project, not a tutorial',
    text: 'You work on an open problem in African NLP — your own idea or one matched to your interests — and own the work end to end with your mentor’s support.',
  },
  {
    icon: <IconBookOpen size={26} />,
    tag: 'Publication',
    title: 'A path to your first paper',
    text: 'The program is built around a concrete output: a paper submitted to a *ACL venue or the AfricaNLP workshop, with your mentor as a co-author and guide.',
  },
  {
    icon: <IconHeart size={26} />,
    tag: 'Community',
    title: 'A cohort that has your back',
    text: 'You join a cohort of peers across the continent — shared reading groups, work-in-progress sessions, and a network that outlasts the program.',
  },
  {
    icon: <IconShieldCheck size={26} />,
    tag: 'Access',
    title: 'Open regardless of background',
    text: 'No institutional affiliation, no big-name reference, and no prior publications required. We select on curiosity and effort, not pedigree.',
  },
  {
    icon: <IconSparkles size={26} />,
    tag: 'Resources',
    title: 'Compute, data and tooling',
    text: 'Fellows get guidance on accessing compute, the AfriPlaybook’s templates and datasets, and the wider Masakhane and AfriFinder ecosystem.',
  },
];

// Cohort program phases — the timeline.
const TIMELINE = [
  {
    n: '01',
    when: 'Aug – Sep 2026',
    title: 'Applications open',
    text: 'A short written application: who you are, what you want to work on, and why. No publications or referrals needed.',
  },
  {
    n: '02',
    when: 'Oct 2026',
    title: 'Selection & matching',
    text: 'We review applications and pair each fellow with a mentor whose expertise fits their language, modality, and research interest.',
  },
  {
    n: '03',
    when: 'Nov 2026 – Mar 2027',
    title: 'Research sprint',
    text: 'A focused five-month program: weekly mentor meetings, monthly cohort check-ins, and steady progress from question to results.',
  },
  {
    n: '04',
    when: 'Apr – May 2027',
    title: 'Write-up & submission',
    text: 'Fellows write up their work and submit to a *ACL venue or the AfricaNLP workshop, with mentors guiding framing, reviews and rebuttals.',
  },
];

// Who we are looking for.
const WHO = [
  'Students, self-taught researchers, and practitioners anywhere in Africa or the diaspora.',
  'People working on — or eager to work on — an African language or a problem that matters to African communities.',
  'Anyone with the curiosity and the time to commit, regardless of degree, institution, or prior publications.',
];

export default function Fellowship() {
  const mark = useBaseUrl('/img/brand/afriannotate-mark.svg');
  const cohortImg = useBaseUrl('/img/fellowship/cohort.jpg');
  const mentorshipImg = useBaseUrl('/img/fellowship/mentorship.jpg');

  return (
    <Layout
      title="AfriNLP Fellowship — world-class mentorship for Africa’s next NLP researchers"
      description="A cohort-based research fellowship that pairs aspiring African NLP researchers with experienced mentors from leading labs, aimed at a first *ACL or AfricaNLP publication.">
      <Head>
        <body className="lp-host" />
      </Head>
      <div className="lp-page">

        {/* ============ HERO ============ */}
        <header className="lp-hero-brand">
          <div className="lp-hero-fold">
            <img className="lp-hero-bg" src={mark} alt="" aria-hidden="true" />
            <div className="lp-wrap lp-hero-center">
              <span className="lp-eyebrow lp-anim lp-d1">AfriNLP Fellowship</span>
              <div className="lp-tickframe lp-anim lp-d2">
                <span className="lp-tick lp-tick-tl" />
                <span className="lp-tick lp-tick-tr" />
                <span className="lp-tick lp-tick-bl" />
                <span className="lp-tick lp-tick-br" />
                <h1 className="lp-h1">
                  World-class mentorship for Africa’s <em>next NLP researchers.</em>
                </h1>
              </div>
              <p className="lp-lead lp-anim lp-d3">
                A cohort-based research fellowship that pairs aspiring African
                NLP researchers with experienced mentors from leading labs and
                universities — so that talent across the continent gets the
                guidance it deserves, regardless of where you studied or who you
                know.
              </p>
              <div className="lp-cta-row lp-anim lp-d4">
                <a className="lp-btn lp-btn-primary" href="https://discord.gg/ChNPHV2PPS" target="_blank" rel="noopener noreferrer">
                  Apply to be a fellow <IconArrowRight size={18} />
                </a>
                <a className="lp-btn lp-btn-ghost" href="https://discord.gg/ChNPHV2PPS" target="_blank" rel="noopener noreferrer">
                  Become a mentor
                </a>
              </div>
              <div className="lp-hero-stats lp-anim lp-d5">
                <div>
                  <div className="lp-stat-num">1-to-1</div>
                  <div className="lp-stat-label">mentorship</div>
                </div>
                <div>
                  <div className="lp-stat-num">~5 months</div>
                  <div className="lp-stat-label">of guided research</div>
                </div>
                <div>
                  <div className="lp-stat-num">*ACL</div>
                  <div className="lp-stat-label">publication target</div>
                </div>
              </div>
            </div>
          </div>

          {/* Establishing photo — African students collaborating (Iwaria, Unsplash). */}
          <div className="lp-wrap">
            <div className="lp-hero-shot">
              <div className="lp-frame">
                <img src={cohortImg} alt="African students working together on laptops" loading="lazy" />
              </div>
            </div>
          </div>
        </header>

        {/* ============ TRUST ============ */}
        <div className="lp-wrap">
          <div className="lp-trust">
            <span>Open across <b>Africa &amp; the diaspora</b></span>
            <span><b>No affiliation</b> required</span>
            <span>A path to your <b>first paper</b></span>
          </div>
        </div>

        {/* ============ THE NEED ============ */}
        <section className="lp-section">
          <div className="lp-wrap">
            <h2 className="lp-h2" style={{maxWidth: '16em'}}>
              The talent is already here. <em>What’s missing is the mentorship.</em>
            </h2>
            <p className="lp-body">
              African languages are spoken by hundreds of millions of people and
              represented in almost none of the tools, datasets, and papers that
              shape modern NLP. The talent to change that already exists across
              the continent. What is missing, too often, is access: a mentor who
              has published before, who can sharpen a research question, read a
              draft honestly, and open the door to a first paper.
            </p>
            <p className="lp-body">
              One thing moves the needle more than anything else — pairing
              motivated people with researchers willing to mentor them. The
              AfriNLP Fellowship is built on that idea: it connects Africa’s most
              promising NLP minds with experienced mentors from around the world,
              and makes sure the best guidance reaches people who would never
              otherwise have it, whatever their background.
            </p>
          </div>
        </section>

        {/* ============ WHAT YOU GET ============ */}
        <section className="lp-section" style={{paddingTop: 0}}>
          <div className="lp-wrap">
            <h2 className="lp-h2">Everything you need to do real research</h2>
            <div className="lp-feature-grid">
              {BENEFITS.map((b) => (
                <article key={b.title} className="lp-feature-card is-unique">
                  <div className="lp-feature-top">
                    <span className="lp-feature-icon">{b.icon}</span>
                    <span className="lp-badge">{b.tag}</span>
                  </div>
                  <h3 className="lp-feature-h">{b.title}</h3>
                  <p className="lp-feature-p">{b.text}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ============ TIMELINE ============ */}
        <section className="lp-section" style={{paddingTop: 0}}>
          <div className="lp-wrap">
            <h2 className="lp-h2">From application to publication in one cohort</h2>
            <p className="lp-body" style={{marginBottom: '1.5rem'}}>
              The first AfriNLP Fellowship cohort runs over roughly nine months,
              built around a single goal: getting each fellow’s work to a place
              where it can be submitted, reviewed, and published.
            </p>
            <div className="lp-steps">
              {TIMELINE.map((s) => (
                <div key={s.n} className="lp-step">
                  <div className="lp-step-n">{s.n}</div>
                  <span className="lp-badge" style={{marginBottom: '0.6rem', display: 'inline-flex', alignItems: 'center', gap: '0.35rem'}}>
                    <IconCalendar size={13} /> {s.when}
                  </span>
                  <h3 className="lp-step-h">{s.title}</h3>
                  <p className="lp-step-p">{s.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ============ MENTORSHIP / PUBLICATION SPLIT ============ */}
        <section className="lp-section" style={{paddingTop: 0}}>
          <div className="lp-wrap lp-split">
            <div>
              <span className="lp-split-tag">Paired with researchers</span>
              <h2 className="lp-h2" style={{marginTop: '0.8rem'}}>
                Matched with a mentor who reviews the best work
              </h2>
              <p className="lp-body">
                Every fellow is paired with an experienced researcher who guides
                them through the project — refining the question, reviewing
                experiments, and giving honest feedback on the writing. Mentors
                are drawn from leading labs, universities, and the African NLP
                community, and are matched to each fellow by language, modality,
                and research interest.
              </p>
              <p className="lp-body">
                The aim is not a certificate. It is a real publication: a paper
                submitted to a <em>*ACL</em> venue (ACL, EMNLP, NAACL, or
                Findings) or the AfricaNLP workshop, co-authored with the mentor
                who helped build it.
              </p>
              <div className="lp-cta-row">
                <a className="lp-btn lp-btn-primary" href="https://discord.gg/ChNPHV2PPS" target="_blank" rel="noopener noreferrer">
                  Apply to be a fellow <IconArrowRight size={18} />
                </a>
              </div>
            </div>
            {/* Mentorship photo — pair-programming / review (Desola Lanre-Ologun, Unsplash). */}
            <div className="lp-split-media">
              <div className="lp-frame">
                <img src={mentorshipImg} alt="A researcher mentoring a fellow at a laptop, reviewing code together" loading="lazy" />
              </div>
            </div>
          </div>
        </section>

        {/* ============ WHO SHOULD APPLY ============ */}
        <section className="lp-section" style={{paddingTop: 0}}>
          <div className="lp-wrap">
            <h2 className="lp-h2">You don’t need permission to be a researcher</h2>
            <div className="lp-vs" style={{gridTemplateColumns: '1fr'}}>
              <div className="lp-vs-col lp-vs-new">
                {WHO.map((t) => (
                  <div key={t} className="lp-vs-item">
                    <span className="lp-vs-mark"><IconCheckCircle size={18} /></span>
                    <span>{t}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ============ FINAL CTA ============ */}
        <section className="lp-final">
          <span className="lp-section-kicker">Community-owned</span>
          <h2 className="lp-h2">Africa’s best deserve the best mentorship.</h2>
          <p className="lp-lead">
            Apply to join the first cohort, or step up as a mentor and help build
            the next generation of African NLP researchers.
          </p>
          <div className="lp-cta-row">
            <a className="lp-btn lp-btn-primary" href="https://discord.gg/ChNPHV2PPS" target="_blank" rel="noopener noreferrer">
              Apply to be a fellow <IconArrowRight size={18} />
            </a>
            <a className="lp-btn lp-btn-ghost" href="https://discord.gg/ChNPHV2PPS" target="_blank" rel="noopener noreferrer">
              Become a mentor
            </a>
          </div>
        </section>

      </div>
    </Layout>
  );
}
