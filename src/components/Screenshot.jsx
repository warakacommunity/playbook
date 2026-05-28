import React from 'react';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './Screenshot.module.css';

export default function Screenshot({ file, caption, width }) {
  const src = useBaseUrl(`/img/screenshots/${file}`);
  return (
    <figure className={styles.figure}>
      <img
        src={src}
        alt={caption || file}
        loading="lazy"
        className={styles.img}
        style={width ? { maxWidth: width } : undefined}
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
