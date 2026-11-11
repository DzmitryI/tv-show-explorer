import type { FC } from 'react';
import { GenreFilter, GenreFilterSkeleton } from './components/genre-filter';
import { Pagination } from './components/pagination';
import { ResultsSummary } from './components/results-summary';
import { SearchBar } from './components/search-bar';
import { ShowCard, ShowCardSkeleton } from './components/show-card';
import styles from './HomePage.module.css';
import { usePresenter } from './usePresenter';

export const HomePage: FC = () => {
  const {
    status,
    submittedQuery,
    totalCount,
    filteredCount,
    page,
    totalPages,
    genres,
    selectedGenre,
    visibleShows,
    emptyMessage,
    skeletonCount,
    resultsRef,
    handleSearch,
    handleClear,
    changePage,
    toggleGenre,
  } = usePresenter();

  const renderResults = () => {
    if (status === 'idle') {
      return null;
    }

    if (status === 'loading') {
      return (
        <div role="status">
          <span className={styles.srOnly}>Loading TV shows…</span>
          <ul className={styles.grid} aria-hidden="true">
            {Array.from({ length: skeletonCount }, (_, index) => (
              <ShowCardSkeleton key={index} />
            ))}
          </ul>
        </div>
      );
    }

    if (status === 'error') {
      return (
        <p className={styles.message} role="alert">
          Something went wrong while loading TV shows. Please try again.
        </p>
      );
    }

    if (visibleShows.length === 0) {
      return <p className={styles.message} role="status">{emptyMessage}</p>;
    }

    return (
      <>
        <ul className={styles.grid}>
          {visibleShows.map((show) => (
            <ShowCard key={show.id} show={show} />
          ))}
        </ul>
        <Pagination page={page} totalPages={totalPages} onPageChange={changePage} />
      </>
    );
  };

  return (
    <main className={styles.page}>
      <h1 className={styles.heading}>TV Show Explorer</h1>
      <SearchBar onSearch={handleSearch} onClear={handleClear} />
      {status === 'success' && (
        <ResultsSummary
          query={submittedQuery}
          totalCount={totalCount}
          filteredCount={filteredCount}
          selectedGenre={selectedGenre}
        />
      )}
      {status === 'loading' && <GenreFilterSkeleton />}
      <GenreFilter genres={genres} selectedGenre={selectedGenre} onToggle={toggleGenre} />
      <section ref={resultsRef} className={styles.results}>
        {renderResults()}
      </section>
    </main>
  );
};
