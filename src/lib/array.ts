/**
 * Returns a copy of `items` rotated left by `offset` positions.
 * Deterministic — used to vary mock/seed rows across modules without
 * reordering on every render (which would break React keys).
 */
export const rotateBy = <T>(items: T[], offset: number): T[] =>
    items.map((_, i) => items[(i + offset) % items.length])
