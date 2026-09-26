import { useBaseUrlUtils } from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

// The project's supporter gets a featured card with a written acknowledgement;
// partners follow in a static logo row. Shown above the footer on every page.
const SUPPORTER = {
  name: 'Masakhane African Languages Hub',
  image: '/img/supporters/masakhane-hub.jpg',
  url: 'https://www.masakhane.io/masakhane-african-languages-hub',
};

const PARTNERS = [
  { name: 'Bayero University, Kano', logo: '/img/supporters/bayero.png', url: 'https://www.buk.edu.ng/' },
  { name: 'Bahir Dar University', logo: '/img/supporters/bahir-dar.png', url: 'https://www.bdu.edu.et/' },
  { name: 'HausaNLP', logo: '/img/supporters/hausanlp.svg', url: 'https://hausanlp.org/' },
  { name: 'EthioNLP', logo: '/img/supporters/EthioNLP_logo.png', url: 'https://ethionlp.github.io/' },
];

export default function SupportedBySection() {
  const { withBaseUrl } = useBaseUrlUtils();
  return (
    <section className={styles.supportedByCard} aria-labelledby="supported-by-title">
      <div className="container">
        <div className={styles.supporterFeature}>
          <a
            className={styles.supporterImage}
            href={SUPPORTER.url}
            target="_blank"
            rel="noreferrer noopener">
            <img
              src={withBaseUrl(SUPPORTER.image)}
              alt="Masakhane African Languages Hub logo"
              width="960"
              height="540"
              loading="lazy"
              decoding="async"
            />
          </a>
          <div className={styles.supporterText}>
            <p className={styles.supportersLabel}>Supported by</p>
            <h2 id="supported-by-title" className={styles.supporterName}>
              {SUPPORTER.name}
            </h2>
            <p className={styles.supporterBody}>
              The AfriPlaybook is supported by the Masakhane African Languages
              Hub, a pan-African initiative building open, culturally grounded
              datasets for African languages. We are grateful for its support.
            </p>
            <a
              className={styles.supporterLink}
              href={SUPPORTER.url}
              target="_blank"
              rel="noreferrer noopener">
              About the Hub
            </a>
          </div>
        </div>

        <p className={`${styles.supportersLabel} ${styles.partnersLabel}`}>
          In collaboration with
        </p>
        <ul className={styles.partnerRow}>
          {PARTNERS.map((p) => (
            <li key={p.name}>
              <a
                href={p.url}
                className={styles.supporterLogo}
                target="_blank"
                rel="noreferrer noopener">
                <img src={withBaseUrl(p.logo)} alt={p.name} loading="lazy" decoding="async" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
