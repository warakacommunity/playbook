import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import { IconUsers, IconMapPin, IconRocket, IconCheckCircle } from '@site/src/components/Icons';
import styles from './afrifinder.module.css';

export default function AfriFinder() {
  return (
    <Layout
      title="AfriFinder"
      description="Find verified annotators and African NLP experts by language, domain, and region.">
      <main className={styles.main}>
        <div className="container">

          {/* Hero */}
          <section className={styles.hero}>
            <span className={styles.eyebrow}>
              <IconRocket size={14} /> Coming soon
            </span>
            <Heading as="h1" className={styles.title}>
              AfriFinder
            </Heading>
            <p className={styles.tagline}>
              Find annotators and collaborators for any African language —
              vetted by the communities who speak it.
            </p>
          </section>

          {/* The problem */}
          <section className={styles.section}>
            <Heading as="h2" className={styles.sectionTitle}>The problem</Heading>
            <p className={styles.body}>
              African NLP runs into the same two walls again and again:
              finding verified, quality annotators for a specific language,
              and finding the right researcher, linguist, or engineer to
              collaborate with. Today this happens over Twitter, WhatsApp
              groups, and word of mouth — slow, opaque, and hard to scale.
              AfriFinder is a single place to do both, with people who
              actually speak the language vouching for who is qualified.
            </p>
          </section>

          {/* Modules */}
          <section className={styles.section}>
            <Heading as="h2" className={styles.sectionTitle}>Two modules</Heading>

            <div className={styles.cardGrid}>
              <article className={styles.card}>
                <div className={styles.cardIcon}>
                  <IconCheckCircle size={26} />
                </div>
                <Heading as="h3" className={styles.cardTitle}>
                  Annotation Marketplace
                </Heading>
                <p className={styles.cardSub}>
                  A workspace for posting and picking up annotation jobs in
                  African languages — transcription, translation, sentiment,
                  NER, and more.
                </p>
                <ul className={styles.cardList}>
                  <li>
                    Researchers, companies, and NGOs post tasks with clear
                    scope, pay, and timeline.
                  </li>
                  <li>
                    Annotators register, declare their native and fluent
                    languages, and get verified by a Language Lead.
                  </li>
                  <li>
                    Language Leads are trusted community figures per
                    language — Yoruba, Twi, Amharic, and so on — who vet
                    annotators and resolve disputes.
                  </li>
                  <li>
                    Quality is tracked through agreement scores, reviewer
                    tiers, and lead sign-off.
                  </li>
                </ul>
              </article>

              <article className={styles.card}>
                <div className={styles.cardIcon}>
                  <IconUsers size={26} />
                </div>
                <Heading as="h3" className={styles.cardTitle}>
                  Expert & Collaborator Directory
                </Heading>
                <p className={styles.cardSub}>
                  Profiles of researchers, engineers, and linguists working
                  on African languages — searchable by what they actually
                  do.
                </p>
                <ul className={styles.cardList}>
                  <li>
                    Tagged by language expertise (Hausa, Zulu, Wolof, and
                    others).
                  </li>
                  <li>
                    Tagged by NLP domain — MT, ASR, sentiment, TTS, NER,
                    and so on.
                  </li>
                  <li>
                    Tagged by role: academic, industry, independent,
                    linguist.
                  </li>
                  <li>
                    Filterable by region. Open to collaboration requests
                    and project invitations.
                  </li>
                </ul>
              </article>
            </div>
          </section>

          {/* Comparison */}
          <section className={styles.section}>
            <Heading as="h2" className={styles.sectionTitle}>
              How it differs from MTurk
            </Heading>
            <div className={styles.tableWrap}>
              <table className={styles.compareTable}>
                <thead>
                  <tr>
                    <th>MTurk</th>
                    <th>AfriFinder</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Generic, global</td>
                    <td>African languages first</td>
                  </tr>
                  <tr>
                    <td>No language verification</td>
                    <td>Language Lead gatekeeping</td>
                  </tr>
                  <tr>
                    <td>No expert network</td>
                    <td>Marketplace plus directory in one place</td>
                  </tr>
                  <tr>
                    <td>No community layer</td>
                    <td>Community-owned per language</td>
                  </tr>
                  <tr>
                    <td>Pays in USD, often hard to access</td>
                    <td>Mobile money and local payout options</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Closing */}
          <section className={styles.closing}>
            <Heading as="h2" className={styles.sectionTitle}>
              <IconMapPin size={20} /> Get involved
            </Heading>
            <p className={styles.body}>
              AfriFinder is in early development. If you want to be a
              Language Lead, join the directory as an expert, or post the
              first annotation jobs once we go live, tell us which language
              and role you're interested in.
            </p>
            <div className={styles.ctaRow}>
              <a className={styles.primaryBtn} href="mailto:afriannotate@gmail.com?subject=AfriFinder%20interest">
                Email the team
              </a>
              <a
                className={styles.secondaryBtn}
                href="https://discord.gg/ChNPHV2PPS"
                target="_blank"
                rel="noopener noreferrer"
              >
                Join the Discord
              </a>
            </div>
          </section>

        </div>
      </main>
    </Layout>
  );
}
