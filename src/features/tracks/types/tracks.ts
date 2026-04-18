export type TrackPopularity = 'week' | 'month' | 'year' | 'all'
export type TrackRatingFilter = 'highest' | 'lowest' | 'highest-by-me' | 'lowest-by-me'
export type TrackDecadeFilter =
    | '1950s'
    | '1960s'
    | '1970s'
    | '1980s'
    | '1990s'
    | '2000s'
    | '2010s'
    | '2020s'
    | 'upcoming'

export type TrackFilters = {
    decade: TrackDecadeFilter | null
    rating: TrackRatingFilter | null
    popularity: TrackPopularity | null
}
