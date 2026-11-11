import type { FC } from 'react';
import styles from './GenreFilterSkeleton.module.css';

const CHIP_WIDTHS = [72, 96, 64, 88, 80, 104];

export const GenreFilterSkeleton: FC = () => (
  <div className={styles.filter} aria-hidden="true">
    {CHIP_WIDTHS.map((width) => (
      <div key={width} className={styles.chip} style={{ width }} />
    ))}
  </div>
);
