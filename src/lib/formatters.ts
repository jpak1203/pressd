const parseDate = (iso: string | null | undefined): Date | null => {
    if (!iso) return null
    const date = new Date(iso)
    return Number.isNaN(date.getTime()) ? null : date
}

export const formatFullDate = (iso: string | null | undefined) => {
    const date = parseDate(iso)
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    })
}

export const formatShortDate = (iso: string | null | undefined) => {
    const date = parseDate(iso)
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
    })
}

export const formatDuration = (ms: number) => {
    const mins = Math.floor(ms / 60000)
    const secs = Math.floor((ms % 60000) / 1000)
    return `${mins}:${secs.toString().padStart(2, '0')}`
}

export const formatMemberSince = (iso: string | null | undefined) => {
    const date = parseDate(iso)
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
    })
}
