export type AlbumPopularity = 'week' | 'month' | 'year' | 'all'
export type AlbumRatingFilter = 'highest' | 'lowest' | 'highest-by-me' | 'lowest-by-me'
export type AlbumDecadeFilter =
    | '1950s'
    | '1960s'
    | '1970s'
    | '1980s'
    | '1990s'
    | '2000s'
    | '2010s'
    | '2020s'
    | 'upcoming'

export type AlbumFilters = {
    decade: AlbumDecadeFilter | null
    rating: AlbumRatingFilter | null
    popularity: AlbumPopularity | null
}
