import type { GenreOption } from '../../types';

interface GenreFilterParams {
  selectedGenre: string | null
  onToggle: (genre: string) => void
}

interface PresenterResult {
  isSelected: (genre: string) => boolean
  select: (genre: string) => () => void
  getLabel: (genre: GenreOption) => string
}

export function usePresenter({
  selectedGenre,
  onToggle,
}: GenreFilterParams): PresenterResult {
  return {
    isSelected: (genre: string) => genre === selectedGenre,
    select: (genre: string) => () => onToggle(genre),
    getLabel: ({ name, count }: GenreOption) => `${name} (${count})`,
  };
}
