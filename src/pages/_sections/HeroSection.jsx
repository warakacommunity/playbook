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
          An <span className={styles.heroTitleAccent}>African language lab</span>.
        </Heading>
        <p className={styles.heroHomeTagline}>
          Learn the craft in the AfriPlaybook, annotate with AfriAnnotate, find
          verified collaborators on AfriFinder, and get mentored to publication
          in the AfriNLP Fellowship. One pipeline, open to everyone.
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
