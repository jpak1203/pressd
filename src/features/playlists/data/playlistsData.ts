import type { PlaylistSearchResult } from '@/features/search-results/types/search-results'

export const featuredPlaylists: PlaylistSearchResult[] = [
    {
        id: 'pl-1',
        name: 'Late Night Drives',
        description: 'For those long drives under city lights',
        owner_username: 'cerys',
        image_url: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
        track_count: 24,
    },
    {
        id: 'pl-2',
        name: 'Bedroom Pop Essentials',
        description: null,
        owner_username: 'david_sims',
        image_url: 'https://i.scdn.co/image/ab67616d0000b2736938311000a0e494a26986e5',
        track_count: 18,
    },
    {
        id: 'pl-3',
        name: 'Indie R&B',
        description: 'The best of indie R&B',
        owner_username: 'sam_w',
        image_url: 'https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5',
        track_count: 31,
    },
    {
        id: 'pl-4',
        name: 'Sunday Morning',
        description: null,
        owner_username: 'jack_m',
        image_url: 'https://i.scdn.co/image/ab67616d0000b27336615a0a60523dd62135ab3a',
        track_count: 12,
    },
    {
        id: 'pl-5',
        name: 'Melancholy Bangers',
        description: 'Songs that hit different at 2am',
        owner_username: 'cerys',
        image_url: 'https://i.scdn.co/image/ab67616d0000b2731624590458126fc8b8c64c2f',
        track_count: 40,
    },
    {
        id: 'pl-6',
        name: 'When Friends Come Over',
        description: null,
        owner_username: 'jujubeguud',
        image_url: 'https://i.scdn.co/image/ab67616d0000b27330a635de2bb0caa4e26f6abb',
        track_count: 22,
    },
]

export const popularPlaylists: PlaylistSearchResult[] = [
    ...featuredPlaylists.slice(2),
    ...featuredPlaylists.slice(0, 2),
].slice(0, 10)
