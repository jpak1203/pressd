export const formatRating = (rating?: number | null) => {
    if (typeof rating !== 'number' || Number.isNaN(rating)) {
        return 'No rating'
    }
    return rating.toFixed(1)
}
