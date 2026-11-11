import type { TvShow } from '../types';
import type { TvMazeSearchItemDto } from './types';

export const toTvShow = ({ show }: TvMazeSearchItemDto): TvShow => ({
  id: show.id,
  title: show.name,
  poster: show.image?.medium ?? null,
  rating: show.rating?.average ?? null,
  year: show.premiered ? Number(show.premiered.slice(0, 4)) : null,
  genres: show.genres ?? [],
  url: show.url,
});
