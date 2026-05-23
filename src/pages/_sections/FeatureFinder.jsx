import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from '../index.module.css';

export default function FeatureFinder() {
  return (
    <section
      className={clsx(styles.section, styles.altSection, styles.featureRow, styles.snapSection)}
      data-snap-section="finder"
    >
      <div className={clsx('container', styles.featureGrid)}>
        <div className={styles.featureCopy}>
          <Heading as="h2" className={styles.blogTeaserHeading}>
            AfriFinder
          </Heading>
          <p className={styles.featureLead}>
            Find verified annotators and African NLP experts by language,
            domain, and region — vouched for by the communities who speak
            the language. A marketplace for annotation jobs and a directory
            for researchers and linguists, in one place.
          </p>
          <ul className={styles.featureList}>
            <li>Post annotation tasks and hire native-speaker annotators</li>
            <li>Search experts by language, NLP domain, and region</li>
            <li>Language Lead verification per language community</li>
            <li>Mobile money and local payout options for annotators</li>
            <li>Open profiles for collaboration and project invitations</li>
          </ul>
        </div>

        <div className={styles.featureVisual}>
          <div className={styles.finderMock} aria-hidden="true">

            {/* Search bar */}
            <div className={styles.finderSearch}>
              <span className={styles.finderSearchIcon}>
                <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="11" cy="11" r="8" />
                  <line x1="21" y1="21" x2="16.65" y2="16.65" />
                </svg>
              </span>
              <span className={styles.finderSearchText}>
                Swahili
                <span className={styles.finderSearchPlus}>+</span>
                ASR
                <span className={styles.finderSearchPlus}>+</span>
                East Africa
              </span>
              <span className={styles.finderSearchCaret} />
            </div>

            {/* Filter chips */}
            <div className={styles.finderFilters}>
              <span className={clsx(styles.finderChip, styles.finderChipActive)}>
                <span className={styles.finderChipDot} /> All
              </span>
              <span className={styles.finderChip}>Annotators</span>
              <span className={styles.finderChip}>Researchers</span>
              <span className={styles.finderChip}>Linguists</span>
            </div>

            {/* Result cards */}
            <div className={styles.finderResults}>
              <article className={clsx(styles.finderCard, styles.finderCardActive)}>
                <div className={styles.finderAvatar} data-hue="200">AN</div>
                <div className={styles.finderCardBody}>
                  <div className={styles.finderCardHead}>
                    <span className={styles.finderName}>Amina Ngoma</span>
                    <span className={styles.finderVerified} title="Verified by Language Lead">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </span>
                  </div>
                  <div className={styles.finderRole}>Linguist · Dar es Salaam</div>
                  <div className={styles.finderTags}>
                    <span className={clsx(styles.finderTag, styles.finderTagLang)}>Swahili</span>
                    <span className={clsx(styles.finderTag, styles.finderTagDomain)}>ASR</span>
                    <span className={clsx(styles.finderTag, styles.finderTagDomain)}>TTS</span>
                  </div>
                </div>
              </article>

              <article className={styles.finderCard}>
                <div className={styles.finderAvatar} data-hue="30">KO</div>
                <div className={styles.finderCardBody}>
                  <div className={styles.finderCardHead}>
                    <span className={styles.finderName}>Kwame Owusu</span>
                  </div>
                  <div className={styles.finderRole}>Researcher · KNUST, Kumasi</div>
                  <div className={styles.finderTags}>
                    <span className={clsx(styles.finderTag, styles.finderTagLang)}>Twi</span>
                    <span className={clsx(styles.finderTag, styles.finderTagDomain)}>MT</span>
                    <span className={clsx(styles.finderTag, styles.finderTagDomain)}>NER</span>
                  </div>
                </div>
              </article>

              <article className={styles.finderCard}>
                <div className={styles.finderAvatar} data-hue="340">FT</div>
                <div className={styles.finderCardBody}>
                  <div className={styles.finderCardHead}>
                    <span className={styles.finderName}>Fatima Tijani</span>
                    <span className={styles.finderVerified} title="Verified by Language Lead">
                      <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor" aria-hidden="true">
                        <path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" stroke="currentColor" strokeWidth="2" fill="none" />
                      </svg>
                    </span>
                  </div>
                  <div className={styles.finderRole}>Annotator · Kano</div>
                  <div className={styles.finderTags}>
                    <span className={clsx(styles.finderTag, styles.finderTagLang)}>Hausa</span>
                    <span className={clsx(styles.finderTag, styles.finderTagDomain)}>Sentiment</span>
                  </div>
                </div>
              </article>
            </div>

            {/* Footer hint */}
            <div className={styles.finderFooter}>
              <span className={styles.finderFooterDot} /> 24 verified profiles match this filter
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
