import type { FC } from 'react';
import type { GenreOption } from '../../types';
import styles from './GenreFilter.module.css';
import { usePresenter } from './usePresenter';

interface GenreFilterProps {
  genres: GenreOption[]
  selectedGenre: string | null
  onToggle: (genre: string) => void
}

export const GenreFilter: FC<GenreFilterProps> = ({
  genres,
  ...rest
}) => {
  const { isSelected, select, getLabel } = usePresenter(rest);

  if (genres.length === 0) {
    return null;
  }

  return (
    <div className={styles.filter} role="group" aria-label="Filter by genre">
      {genres.map((genre) => (
        <button
          key={genre.name}
          type="button"
          className={styles.chip}
          aria-pressed={isSelected(genre.name)}
          onClick={select(genre.name)}
        >
          {getLabel(genre)}
        </button>
      ))}
    </div>
  );
};
