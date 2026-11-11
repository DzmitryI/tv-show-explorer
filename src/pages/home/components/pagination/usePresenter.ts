interface PaginationParams {
  page: number
  totalPages: number
  onPageChange: (page: number) => void
}

interface PresenterResult {
  label: string
  isFirstPage: boolean
  isLastPage: boolean
  goToFirst: () => void
  goToPrevious: () => void
  goToNext: () => void
  goToLast: () => void
}

export function usePresenter({
  page,
  totalPages,
  onPageChange,
}: PaginationParams): PresenterResult {
  return {
    label: `Page ${page} of ${totalPages}`,
    isFirstPage: page === 1,
    isLastPage: page === totalPages,
    goToFirst: () => onPageChange(1),
    goToPrevious: () => onPageChange(page - 1),
    goToNext: () => onPageChange(page + 1),
    goToLast: () => onPageChange(totalPages),
  };
}
