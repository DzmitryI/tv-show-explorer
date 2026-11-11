export interface TvShow {
  id: number
  title: string
  poster: string | null
  rating: number | null
  year: number | null
  genres: string[]
  url: string
}

export interface GenreOption {
  name: string
  count: number
}
