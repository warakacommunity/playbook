import clsx from 'clsx';
import Link from '@docusaurus/Link';
import Heading from '@theme/Heading';
import { IconBookOpen, IconWrench, IconDiscord } from '@site/src/components/Icons';
import styles from '../index.module.css';

export default function HeroSection() {
  return (
    <header
      className={clsx(styles.hero, styles.heroHome, styles.snapSection)}
      data-snap-section="hero"
      data-visible=""
    >
      <div className={styles.heroHomeInner}>
        <Heading as="h1" className={clsx(styles.heroTitle, styles.heroHomeTitle)}>
          Build African language datasets,
          <br />
          <span className={styles.heroTitleAccent}>the right way.</span>
        </Heading>
        <p className={styles.heroHomeTagline}>
          An open playbook and annotation platform for grassroots NLP data
          collection — designed with communities, for communities, across
          the continent.
        </p>
        <div className={styles.heroHomeButtons}>
          <Link className={clsx('button', styles.primaryButton)} to="/AfriPlaybook/">
            <IconBookOpen size={18} /> Read the Playbook
          </Link>
          <Link className={clsx('button', styles.secondaryButton)} to="/tool">
            <IconWrench size={18} /> Explore the Tool
          </Link>
          <Link
            className={clsx('button', styles.discordButton)}
            to="https://discord.gg/ChNPHV2PPS"
          >
            <IconDiscord size={18} /> Join our Discord
          </Link>
        </div>
      </div>
    </header>
  );
}
