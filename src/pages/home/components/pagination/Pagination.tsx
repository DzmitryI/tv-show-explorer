import type { FC } from 'react';
import styles from './Pagination.module.css';
import { usePresenter } from './usePresenter';

interface PaginationProps {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

export const Pagination: FC<PaginationProps> = (props) => {
  const {
    label,
    isFirstPage,
    isLastPage,
    goToFirst,
    goToPrevious,
    goToNext,
    goToLast,
  } = usePresenter(props);

  return (
    <nav className={styles.pagination} aria-label="Pagination">
      <button
        className={styles.button}
        type="button"
        onClick={goToFirst}
        aria-label="First page"
        disabled={isFirstPage}
      >
        {'<<'}
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={goToPrevious}
        disabled={isFirstPage}
      >
        {'<'}
      </button>
      <span>{label}</span>
      <button
        className={styles.button}
        type="button"
        onClick={goToNext}
        disabled={isLastPage}
      >
        {'>'}
      </button>
      <button
        className={styles.button}
        type="button"
        onClick={goToLast}
        aria-label="Last page"
        disabled={isLastPage}
      >
        {'>>'}
      </button>
    </nav>
  );
};
