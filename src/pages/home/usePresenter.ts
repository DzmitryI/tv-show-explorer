import { useRef, useState } from 'react';
import type { RefObject } from 'react';
import type { GenreOption, TvShow } from './types';
import { useShowSearch } from './useShowSearch';
import type { SearchStatus } from './useShowSearch';

const PAGE_SIZE = 3;

interface PresenterResult {
  status: SearchStatus
  submittedQuery: string
  totalCount: number
  filteredCount: number
  page: number
  totalPages: number
  genres: GenreOption[]
  selectedGenre: string | null
  visibleShows: TvShow[]
  emptyMessage: string
  skeletonCount: number
  resultsRef: RefObject<HTMLElement | null>
  handleSearch: (query: string) => void
  handleClear: () => void
  changePage: (page: number) => void
  toggleGenre: (genre: string) => void
}

export function usePresenter(): PresenterResult {
  const { status, query, shows, search, reset } = useShowSearch();
  const [page, setPage] = useState(1);
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  const resultsRef = useRef<HTMLElement>(null);

  const genreCounts = new Map<string, number>();

  shows.forEach((show) => {
    show.genres.forEach((name) => {
      genreCounts.set(name, (genreCounts.get(name) ?? 0) + 1);
    });
  });

  const genres = [...genreCounts]
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => a.name.localeCompare(b.name));
  const filteredShows = selectedGenre
    ? shows.filter((show) => show.genres.includes(selectedGenre))
    : shows;

  const totalPages = Math.ceil(filteredShows.length / PAGE_SIZE);
  const visibleShows = filteredShows.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const emptyMessage = selectedGenre
    ? `No TV shows found in the “${selectedGenre}” genre.`
    : 'No TV shows found for your search.';

  const handleSearch = (query: string) => {
    setPage(1);
    setSelectedGenre(null);
    search(query);
  };

  const handleClear = () => {
    setPage(1);
    setSelectedGenre(null);
    reset();
  };

  const changePage = (nextPage: number) => {
    setPage(nextPage);
    resultsRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const toggleGenre = (genre: string) => {
    setSelectedGenre((current) => (current === genre ? null : genre));
    setPage(1);
  };

  return {
    status,
    submittedQuery: query,
    totalCount: shows.length,
    filteredCount: filteredShows.length,
    page,
    totalPages,
    genres,
    selectedGenre,
    visibleShows,
    emptyMessage,
    skeletonCount: PAGE_SIZE,
    resultsRef,
    handleSearch,
    handleClear,
    changePage,
    toggleGenre,
  };
}
