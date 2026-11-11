import type { FC } from 'react';
import type { TvShow } from '../../types';
import styles from './ShowCard.module.css';
import { usePresenter } from './usePresenter';

interface ShowCardProps {
  show: TvShow
}

export const ShowCard: FC<ShowCardProps> = ({ show }) => {
  const { posterAlt, linkLabel, ratingLabel, yearLabel } = usePresenter(show);

  return (
    <li className={styles.card}>
      <a
        className={styles.link}
        href={show.url}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={linkLabel}
      >
        {show.poster ? (
          <img className={styles.poster} src={show.poster} alt={posterAlt} />
        ) : (
          <div className={`${styles.poster} ${styles.noPoster}`}>No image</div>
        )}
        <div className={styles.info}>
          <h2 className={styles.title}>{show.title}</h2>
          <p className={styles.meta}>
            <span>{ratingLabel}</span>
            <span>{yearLabel}</span>
          </p>
        </div>
      </a>
    </li>
  );
};
