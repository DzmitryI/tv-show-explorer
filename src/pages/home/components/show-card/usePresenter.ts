import type { TvShow } from '../../types';

interface PresenterResult {
  posterAlt: string
  linkLabel: string
  ratingLabel: string
  yearLabel: string
}

export function usePresenter(show: TvShow): PresenterResult {
  return {
    posterAlt: `${show.title} poster`,
    linkLabel: `${show.title} on TVmaze (opens in a new tab)`,
    ratingLabel: show.rating === null ? 'No rating' : `★ ${show.rating.toFixed(1)}`,
    yearLabel: show.year === null ? 'Year unknown' : String(show.year),
  };
}
