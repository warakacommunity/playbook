import { usePluginData } from '@docusaurus/useGlobalData';
import styles from './styles.module.css';

// Everyone who has committed to the playbook repo, pulled at build time by the
// `github-contributors` plugin (docusaurus.config.js). Shown on the
// Contributors page, sorted alphabetically so no one is ranked by commit count.
const nameOf = (c) => (c.login || c.name).toLowerCase();

export default function ContributorGrid() {
  const data = usePluginData('github-contributors');
  const contributors = [...(data?.contributors ?? [])].sort((a, b) =>
    nameOf(a).localeCompare(nameOf(b)),
  );

  // Empty in local previews built without a GITHUB_TOKEN.
  if (contributors.length === 0) {
    return <p><em>The list of contributors appears on the published site.</em></p>;
  }

  return (
    <div className={styles.contributorsGrid}>
      {contributors.map((c) =>
        c.login ? (
          <a
            key={c.login}
            href={c.htmlUrl}
            target="_blank"
            rel="noreferrer noopener"
            className={styles.contributorCard}>
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
  );
}
