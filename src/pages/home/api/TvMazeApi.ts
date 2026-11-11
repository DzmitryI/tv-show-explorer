import type { TvShow } from '../types';
import type { TvMazeSearchItemDto } from './types';
import { toTvShow } from './TvShowMapper';

const SEARCH_URL = 'https://api.tvmaze.com/search/shows';

export const searchShows = async (
  query: string,
  signal: AbortSignal,
): Promise<TvShow[]> => {
  const response = await fetch(`${SEARCH_URL}?q=${encodeURIComponent(query)}`, {
    signal,
  });

  if (!response.ok) {
    throw new Error(`TVmaze request failed with status ${response.status}`);
  }

  const items: TvMazeSearchItemDto[] = await response.json();
  return items.map(toTvShow);
};
