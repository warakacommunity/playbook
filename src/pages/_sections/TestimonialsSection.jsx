import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from '../index.module.css';

// NOTE: These are anonymized placeholder quotes. We have not yet collected and
// cleared quotes from named community members. Until we do, every entry is
// attributed only to a generic role within the African NLP community — no real
// names, orgs, or personal avatars. Once real, permission-cleared quotes are in
// hand, replace `role`/`org`/`image` here with the actual attribution.
const TESTIMONIALS = [
  {
    quote:
      'The Playbook is exactly the practical, reproducible guide that African NLP has needed — a real reference, not a brochure.',
    role: 'NLP researcher',
    org: 'African NLP community',
    initials: 'AN',
    color: '#4a7059',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-1',
  },
  {
    quote:
      'Pairing the Playbook with the Tool turns annotation theory into reproducible practice — that combination is what makes it useful in the field.',
    role: 'Dataset builder',
    org: 'African NLP community',
    initials: 'AN',
    color: '#5d6e8a',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-2',
  },
  {
    quote:
      'Documenting low-resource language work has long been ad-hoc — a shared playbook gives our teams a common vocabulary and saves a lot of guesswork.',
    role: 'Computational linguist',
    org: 'African NLP community',
    initials: 'AN',
    color: '#5b7a8a',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-3',
  },
  {
    quote:
      'Open guidance like this lowers the barrier for builders across the continent to ship language-first AI products responsibly.',
    role: 'ML engineer',
    org: 'African NLP community',
    initials: 'AN',
    color: '#7a5b8a',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-4',
  },
  {
    quote:
      'Open infrastructure for African languages is finally catching up with the rest of the field. This is a major milestone for the community.',
    role: 'Language technologist',
    org: 'African NLP community',
    initials: 'AN',
    color: '#5d8a72',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-5',
  },
  {
    quote:
      'A community-built standard for low-resource annotation. Long overdue and well executed — the kind of resource teams will reach for daily.',
    role: 'Educator & researcher',
    org: 'African NLP community',
    initials: 'AN',
    color: '#8a6b4a',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-6',
  },
  {
    quote:
      'For multilingual annotation across Bantu languages, this is the resource I wish we had had years ago — clear, applicable, and honest about trade-offs.',
    role: 'PhD researcher',
    org: 'African NLP community',
    initials: 'AN',
    color: '#6e8a5b',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-7',
  },
  {
    quote:
      'The combination of methodological rigor and African-context grounding makes this stand out from generic NLP guides — a long-overdue reference.',
    role: 'Open-source contributor',
    org: 'African NLP community',
    initials: 'AN',
    color: '#8a5b6b',
    image: 'https://api.dicebear.com/9.x/personas/svg?seed=community-8',
  },
];

export default function TestimonialsSection() {
  return (
    <section className={clsx(styles.testimonialsSection, styles.snapSection)} data-snap-section="testimonials">
      <div className="container">
        <div className={styles.testimonialsHeader}>
          <Heading as="h2" className={styles.testimonialsHeading}>
            From the Community
          </Heading>
        </div>
        <div className={styles.testimonialsGrid}>
          {TESTIMONIALS.map((t, i) => (
            <article className={styles.testimonialCard} key={i}>
              <p className={styles.testimonialQuote}>{t.quote}</p>
              <div className={styles.testimonialAuthor}>
                {t.image ? (
                  <img
                    src={t.image}
                    alt=""
                    className={styles.testimonialAvatar}
                    loading="lazy"
                    decoding="async"
                  />
                ) : (
                  <span
                    className={styles.testimonialAvatar}
                    style={{background: t.color}}
                    aria-hidden="true">
                    {t.initials}
                  </span>
                )}
                <div className={styles.testimonialAuthorMeta}>
                  <span className={styles.testimonialName}>{t.role}</span>
                  <span className={styles.testimonialRole}>{t.org}</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
