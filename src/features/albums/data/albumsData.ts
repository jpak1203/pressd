import type { RowModuleData } from '@/features/home-page/types/home-page'
import type { AlbumDetail } from '@/features/detail/types/detail'

const albums: AlbumDetail[] = [
    {
        type: 'album',
        id: '1ORxRsK3MrSLvh7VQTF01F',
        name: 'Ultraviolence (Deluxe)',
        image: 'https://i.scdn.co/image/ab67616d0000b2731624590458126fc8b8c64c2f',
        artists: [{ id: '00FQb4jTyendYWaN8pK0wa', name: 'Lana Del Rey' }],
        release_date: '2014-01-01',
        total_tracks: 14,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '5zi7WsKlIiUXv09tbGLKsE',
        name: 'IGOR',
        image: 'https://i.scdn.co/image/ab67616d0000b27330a635de2bb0caa4e26f6abb',
        artists: [{ id: '4V8LLVI7PbaPR0K2TGSxFF', name: 'Tyler, the Creator' }],
        release_date: '2019-05-17',
        total_tracks: 12,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '392p3shh2jkxUxY2VHvlH8',
        name: 'channel ORANGE',
        image: 'https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5',
        artists: [{ id: '2h93pZq0e7k5yf4dywlkpM', name: 'Frank Ocean' }],
        release_date: '2012-07-10',
        total_tracks: 17,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '2LKW0m9cC63QzEI9tJH3ql',
        name: 'Son Of Spergy',
        image: 'https://i.scdn.co/image/ab67616d0000b2732bad6e56e77d5bef0aa3f2dc',
        artists: [{ id: '20wkVLutqVOYrc0kxFs7rA', name: 'Daniel Caesar' }],
        release_date: '2025-10-24',
        total_tracks: 12,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '1tEu6qNPURb0YfjaRDK23w',
        name: 'AAA',
        image: 'https://i.scdn.co/image/ab67616d0000b2735171417ebf322de1640e3478',
        artists: [
            { id: '57okaLdCtv3nVBSn5otJkp', name: 'HYUKOH' },
            { id: '7BqRcZsHYYQeqMAOp7e532', name: '落日飛車 Sunset Rollercoaster' },
        ],
        release_date: '2024-07-10',
        total_tracks: 8,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '6zCMXqMsxHjn534g67bxVK',
        name: "Heaven Ain't Sold",
        image: 'https://i.scdn.co/image/ab67616d0000b273124c201730efde64b45eff79',
        artists: [{ id: '5XQRfs0gXs30aWUn1Umves', name: 'Choker' }],
        release_date: '2026-02-20',
        total_tracks: 11,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '3mH6qwIy9crq0I9YQbOuDf',
        name: 'Blonde',
        image: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
        artists: [{ id: '2h93pZq0e7k5yf4dywlkpM', name: 'Frank Ocean' }],
        release_date: '2016-08-20',
        total_tracks: 17,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '4SBl4zvNIL4H137YRf2P0J',
        name: 'Solar Power',
        image: 'https://i.scdn.co/image/ab67616d0000b27336615a0a60523dd62135ab3a',
        artists: [{ id: '163tK9Wjr9P9DmM0AVK7lm', name: 'Lorde' }],
        release_date: '2021-08-20',
        total_tracks: 12,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '3Ks0eeH0GWpY4AU20D5HPD',
        name: 'Gemini Rights',
        image: 'https://i.scdn.co/image/ab67616d0000b2736938311000a0e494a26986e5',
        artists: [{ id: '57vWImR43h4CaDao012Ofp', name: 'Steve Lacy' }],
        release_date: '2022-07-15',
        total_tracks: 10,
        album_type: 'album',
    },
    {
        type: 'album',
        id: '0LqhbUfmHsxovfSirhEIGu',
        name: 'Historian',
        image: 'https://i.scdn.co/image/ab67616d0000b2736c3ce277efb2276dd13991a0',
        artists: [{ id: '07D1Bjaof0NFlU32KXiqUP', name: 'Lucy Dacus' }],
        release_date: '2018-03-02',
        total_tracks: 10,
        album_type: 'album',
    },
]

const shuffleLike = (offset: number): AlbumDetail[] =>
    albums.map((_, i) => albums[(i + offset) % albums.length])

export const featuredAlbumsData: RowModuleData = {
    items: shuffleLike(0),
    moreHref: '/albums/search',
}

export const recentlyReviewedAlbumsData: RowModuleData = {
    items: shuffleLike(2),
    moreHref: '/albums/search',
}

export const popularAlbumsThisWeek: AlbumDetail[] = shuffleLike(4).slice(0, 10)
