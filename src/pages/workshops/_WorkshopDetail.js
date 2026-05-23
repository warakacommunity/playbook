import React from 'react';
import Link from '@docusaurus/Link';
import Layout from '@theme/Layout';
import Heading from '@theme/Heading';
import styles from './_WorkshopDetail.module.css';

export default function WorkshopDetail({ workshop: w }) {
  return (
    <Layout title={w.title} description={w.subtitle}>
      <main className={styles.page}>
        <div className="container">

          {/* Header */}
          <header className={styles.header}>
            <div className={styles.eyebrow}>
              <span className={styles.eyebrowDot} aria-hidden="true" />
              {w.type}
            </div>
            <Heading as="h1" className={styles.title}>{w.title}</Heading>
            <p className={styles.subtitle}>{w.subtitle}</p>

            <div className={styles.meta}>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Date</span>
                <span className={styles.metaValue}>{w.date}</span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Venue</span>
                <span className={styles.metaValue}>
                  {w.venue}{w.location && w.location !== w.venue ? `, ${w.location}` : ''}
                </span>
              </div>
              <div className={styles.metaItem}>
                <span className={styles.metaLabel}>Duration</span>
                <span className={styles.metaValue}>{w.duration}</span>
              </div>
            </div>
          </header>

          {/* About */}
          <section className={styles.section}>
            <h2 className={styles.sectionTitle}>About the workshop</h2>
            <p className={styles.lead}>{w.description}</p>
          </section>

          {/* Agenda */}
          {w.agenda?.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionTitle}>Agenda</h2>
              <ol className={styles.agendaList}>
                {w.agenda.map((a, i) => (
                  <li key={i} className={styles.agendaItem}>
                    <div className={styles.agendaTime}>{a.time}</div>
                    <div className={styles.agendaBody}>
                      <div className={styles.agendaTitle}>{a.title}</div>
                      {a.detail && <p className={styles.agendaDetail}>{a.detail}</p>}
                    </div>
                  </li>
                ))}
              </ol>
            </section>
          )}

          {/* Objectives + Outcomes */}
          {(w.objectives?.length > 0 || w.outcomes?.length > 0) && (
            <section className={styles.section}>
              <div className={styles.twoCol}>
                {w.objectives?.length > 0 && (
                  <div className={styles.subSection}>
                    <h3>Objectives</h3>
                    <ul className={styles.bulletList}>
                      {w.objectives.map((o, i) => <li key={i}>{o}</li>)}
                    </ul>
                  </div>
                )}
                {w.outcomes?.length > 0 && (
                  <div className={styles.subSection}>
                    <h3>Expected outcomes</h3>
                    <ul className={styles.bulletList}>
                      {w.outcomes.map((o, i) => <li key={i}>{o}</li>)}
                    </ul>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Audience + Organizers */}
          <section className={styles.section}>
            <div className={styles.twoCol}>
              {w.audience?.length > 0 && (
                <div className={styles.subSection}>
                  <h3>Who should attend</h3>
                  <div className={styles.tagList}>
                    {w.audience.map((a, i) => (
                      <span key={i} className={styles.tag}>{a}</span>
                    ))}
                  </div>
                </div>
              )}
              {w.organizers?.length > 0 && (
                <div className={styles.subSection}>
                  <h3>Organizers</h3>
                  <div className={styles.orgList}>
                    {w.organizers.map(({ name, affil }, i) => (
                      <div key={i} className={styles.orgItem}>
                        <span className={styles.orgName}>{name}</span>
                        {affil && <span className={styles.orgAffil}>{affil}</span>}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* Registration */}
          {w.registrationFormUrl && (() => {
            const directUrl = w.registrationFormUrl.replace('?embedded=true', '');
            return (
              <section className={styles.register}>
                <h2 className={styles.registerTitle}>Register for this workshop</h2>
                <p className={styles.registerBody}>
                  Participation is free and open to everyone. Fill in the registration form to secure your spot and receive updates about the session.
                </p>
                <div className={styles.registerButtons}>
                  <Link
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.primaryBtn}
                  >
                    Register
                  </Link>
                  <Link
                    href={directUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={styles.secondaryBtn}
                  >
                    Edit my response
                  </Link>
                </div>
                <p className={styles.registerNote}>
                  Opens in Google Forms — your progress is saved automatically.
                </p>
              </section>
            );
          })()}

        </div>
      </main>
    </Layout>
  );
}
