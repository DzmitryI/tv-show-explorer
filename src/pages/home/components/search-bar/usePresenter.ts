import { useEffect, useRef, useState } from 'react';
import type { ChangeEvent, SubmitEvent } from 'react';

const DEBOUNCE_MS = 400;

interface SearchBarParams {
  onSearch: (query: string) => void
  onClear: () => void
}

interface PresenterResult {
  query: string
  isSearchDisabled: boolean
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void
  handleSubmit: (event: SubmitEvent<HTMLFormElement>) => void
}

export function usePresenter({
  onSearch,
  onClear,
}: SearchBarParams): PresenterResult {
  const [query, setQuery] = useState('');
  const lastQueryRef = useRef('');
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    const trimmed = query.trim();

    if (trimmed === '' || trimmed === lastQueryRef.current) {
      return;
    }

    const timer = setTimeout(() => {
      lastQueryRef.current = trimmed;
      onSearchRef.current(trimmed);
    }, DEBOUNCE_MS);

    return () => clearTimeout(timer);
  }, [query]);

  const isSearchDisabled = query.trim() === '';

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setQuery(value);

    if (value === '') {
      lastQueryRef.current = '';
      onClear();
    }
  };

  const handleSubmit = (event: SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmed = query.trim();
    if (trimmed) {
      lastQueryRef.current = trimmed;
      onSearch(trimmed);
    }
  };

  return { query, isSearchDisabled, handleChange, handleSubmit };
}
