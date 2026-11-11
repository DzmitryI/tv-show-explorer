interface ResultsSummaryParams {
  query: string
  totalCount: number
  filteredCount: number
  selectedGenre: string | null
}

interface PresenterResult {
  summary: string
  filterNote: string | null
}

export function usePresenter({
  query,
  totalCount,
  filteredCount,
  selectedGenre,
}: ResultsSummaryParams): PresenterResult {
  const noun = totalCount === 1 ? 'show' : 'shows';

  return {
    summary: `${totalCount} ${noun} found for “${query}”`,
    filterNote: selectedGenre ? `${filteredCount} in ${selectedGenre}` : null,
  };
}
