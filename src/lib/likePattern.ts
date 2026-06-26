// Escapes LIKE/ILIKE wildcards so input matches literally.
export const escapeLike = (value: string): string =>
    value.replace(/[\\%_]/g, (char) => `\\${char}`)
