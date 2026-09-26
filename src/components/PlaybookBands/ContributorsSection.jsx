import { usePluginData } from '@docusaurus/useGlobalData';
import Heading from '@theme/Heading';
import { IconUsers } from '@site/src/components/Icons';
import styles from './styles.module.css';

// Everyone who has committed to the playbook repo, pulled at build time by the
// `github-contributors` plugin (docusaurus.config.js). Renders nothing when the
// list is empty (e.g. local dev with no GITHUB_TOKEN), so it never shows a
// broken/empty band.
export default function ContributorsSection() {
  const data = usePluginData('github-contributors');
  const contributors = data?.contributors ?? [];

  if (contributors.length === 0) return null;

  return (
    <section className={styles.section}>
      <div className="container">
        <div className={styles.sectionHeader}>
          <Heading as="h2" className={styles.sectionTitle}>
            Thanks to our Contributors
          </Heading>
          <p className={styles.sectionLead}>
            The Playbook is built by a growing community of researchers,
            students, and language experts. If you've contributed code,
            content, or review, thank you.
          </p>
        </div>
        <div className={styles.contributorsGrid}>
          {contributors.map((c) =>
            c.login ? (
              <a
                key={c.login}
                href={c.htmlUrl}
                target="_blank"
                rel="noreferrer noopener"
                className={styles.contributorCard}
                title={`${c.login}: ${c.contributions} contribution${
                  c.contributions === 1 ? '' : 's'
                }`}>
                <img
                  src={c.avatarUrl}
                  alt=""
                  className={styles.contributorAvatar}
                  loading="lazy"
                  decoding="async"
                />
                <span className={styles.contributorLogin}>@{c.login}</span>
              </a>
            ) : (
              // Commit email not linked to a GitHub account: no profile or
              // avatar to show, so use initials and no link.
              <div key={c.name} className={styles.contributorCard}>
                <span
                  className={`${styles.contributorAvatar} ${styles.contributorInitials}`}
                  aria-hidden="true">
                  {c.name
                    .split(/\s+/)
                    .map((w) => w[0])
                    .join('')
                    .slice(0, 2)
                    .toUpperCase()}
                </span>
                <span className={styles.contributorLogin}>{c.name}</span>
              </div>
            ),
          )}
        </div>
        <div className={styles.contributorsCtaWrap}>
          <a
            href="https://discord.gg/ChNPHV2PPS"
            target="_blank"
            rel="noreferrer noopener"
            className={styles.contributorsCta}>
            <IconUsers size={18} /> Join the community
          </a>
        </div>
      </div>
    </section>
  );
}
