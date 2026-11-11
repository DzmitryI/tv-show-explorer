import type { FC } from 'react';
import styles from './ShowCardSkeleton.module.css';

export const ShowCardSkeleton: FC = () => (
  <li className={styles.card}>
    <div className={styles.poster} />
    <div className={styles.info}>
      <div className={styles.title} />
      <div className={styles.meta} />
    </div>
  </li>
);
