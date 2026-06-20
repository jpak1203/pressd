export type ItemDecadeFilter =
    | '1950s'
    | '1960s'
    | '1970s'
    | '1980s'
    | '1990s'
    | '2000s'
    | '2010s'
    | '2020s'
    | 'upcoming'

export type ItemRatingFilter = 'highest' | 'lowest' | 'highest-by-me' | 'lowest-by-me'

export type ItemPopularityFilter = 'week' | 'month' | 'year' | 'all'

export type ItemFilters = {
    decade: ItemDecadeFilter | null
    rating: ItemRatingFilter | null
    popularity: ItemPopularityFilter | null
}

export const EMPTY_ITEM_FILTERS: ItemFilters = {
    decade: null,
    rating: null,
    popularity: null,
}

export const VALID_DECADES: ItemDecadeFilter[] = [
    '1950s',
    '1960s',
    '1970s',
    '1980s',
    '1990s',
    '2000s',
    '2010s',
    '2020s',
    'upcoming',
]

export const VALID_RATINGS: ItemRatingFilter[] = [
    'highest',
    'lowest',
    'highest-by-me',
    'lowest-by-me',
]

export const VALID_POPULARITY: ItemPopularityFilter[] = ['week', 'month', 'year', 'all']

export const parseDecade = (v: string | null): ItemDecadeFilter | null =>
    v && (VALID_DECADES as string[]).includes(v) ? (v as ItemDecadeFilter) : null

export const parseRating = (v: string | null): ItemRatingFilter | null =>
    v && (VALID_RATINGS as string[]).includes(v) ? (v as ItemRatingFilter) : null

export const parsePopularity = (v: string | null): ItemPopularityFilter | null =>
    v && (VALID_POPULARITY as string[]).includes(v) ? (v as ItemPopularityFilter) : null
