export interface TvMazeShowDto {
  id: number
  name: string
  url: string
  genres: string[] | null
  premiered: string | null
  rating: { average: number | null } | null
  image: { medium: string; original: string } | null
}

export interface TvMazeSearchItemDto {
  score: number
  show: TvMazeShowDto
}
