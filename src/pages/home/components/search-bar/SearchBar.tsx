import type { FC } from 'react';
import styles from './SearchBar.module.css';
import { usePresenter } from './usePresenter';

interface SearchBarProps {
  onSearch: (query: string) => void
  onClear: () => void
}

export const SearchBar: FC<SearchBarProps> = (props) => {
  const { query, isSearchDisabled, handleChange, handleSubmit } = usePresenter(props);

  return (
    <form className={styles.search} onSubmit={handleSubmit}>
      <input
        className={styles.input}
        type="search"
        placeholder="Search TV shows..."
        aria-label="Search TV shows"
        value={query}
        onChange={handleChange}
      />
      <button className={styles.button} type="submit" disabled={isSearchDisabled}>
        Search
      </button>
    </form>
  );
};
