import type { FC } from 'react';
import styles from './ResultsSummary.module.css';
import { usePresenter } from './usePresenter';

interface ResultsSummaryProps {
  query: string
  totalCount: number
  filteredCount: number
  selectedGenre: string | null
}

export const ResultsSummary: FC<ResultsSummaryProps> = (props) => {
  const { summary, filterNote } = usePresenter(props);

  return (
    <section className={styles.summary} aria-label="Search results summary" aria-live="polite">
      <p>{summary}</p>
      {filterNote && <p className={styles.note}>{filterNote}</p>}
    </section>
  );
};
