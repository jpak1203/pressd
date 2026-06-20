import type { RowModuleData } from '@/features/home-page/types/home-page'
import type { TrackDetail } from '@/features/detail/types/detail'
import { rotateBy } from '@/lib/array'

const tracks: TrackDetail[] = [
    {
        type: 'track',
        id: '1yYlpGuBiRRf33e1gY61bN',
        name: 'Night Shift',
        image: 'https://i.scdn.co/image/ab67616d0000b2736c3ce277efb2276dd13991a0',
        artists: [{ id: '07D1Bjaof0NFlU32KXiqUP', name: 'Lucy Dacus' }],
        album: { id: '0LqhbUfmHsxovfSirhEIGu', name: 'Historian' },
        duration_ms: 391829,
        release_date: '2018-03-02',
    },
    {
        type: 'track',
        id: '4k6Uh1HXdhtusDW5y8Gbvy',
        name: 'Bad Habit',
        image: 'https://i.scdn.co/image/ab67616d0000b2736938311000a0e494a26986e5',
        artists: [{ id: '57vWImR43h4CaDao012Ofp', name: 'Steve Lacy' }],
        album: { id: '3Ks0eeH0GWpY4AU20D5HPD', name: 'Gemini Rights' },
        duration_ms: 232114,
        release_date: '2022-07-15',
    },
    {
        type: 'track',
        id: '6kj8TeHSns33wt1Z1wdmMx',
        name: 'Solar Power',
        image: 'https://i.scdn.co/image/ab67616d0000b27336615a0a60523dd62135ab3a',
        artists: [{ id: '163tK9Wjr9P9DmM0AVK7lm', name: 'Lorde' }],
        album: { id: '4SBl4zvNIL4H137YRf2P0J', name: 'Solar Power' },
        duration_ms: 399583,
        release_date: '2021-06-10',
    },
    {
        type: 'track',
        id: '0WbMK4wrZ1wFSty9F7FCgu',
        name: 'Good Luck, Babe!',
        image: 'https://i.scdn.co/image/ab67616d0000b27391b4bc7c88d91a42e0f3a8b7',
        artists: [{ id: '7GlBOeep6PqTfFi59PTUUN', name: 'Chappell Roan' }],
        album: {
            id: '1WAjjRMfZjEXtB0lQrAw6Q',
            name: 'The Rise and Fall of a Midwest Princess',
        },
        duration_ms: 218423,
        release_date: '2024-04-05',
    },
    {
        type: 'track',
        id: '2LMkwUfqC6S6s6qDVlEuzV',
        name: 'White Ferrari',
        image: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
        artists: [{ id: '2h93pZq0e7k5yf4dywlkpM', name: 'Frank Ocean' }],
        album: { id: '3mH6qwIy9crq0I9YQbOuDf', name: 'Blonde' },
        duration_ms: 248807,
        release_date: '2016-08-20',
    },
    {
        type: 'track',
        id: '7IVukH71OXfAu3KudrrizN',
        name: 'Japanese Denim',
        image: 'https://i.scdn.co/image/ab67616d0000b2737465bef53d9e3a27c63c7a1d',
        artists: [{ id: '20wkVLutqVOYrc0kxFs7rA', name: 'Daniel Caesar' }],
        album: { id: '5QHoG6laR98M4SZumgSLkB', name: 'Freudian' },
        duration_ms: 270556,
        release_date: '2016-10-21',
    },
    {
        type: 'track',
        id: '3qhlB30KknSejmIvZZLjOD',
        name: 'Pink + White',
        image: 'https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526',
        artists: [{ id: '2h93pZq0e7k5yf4dywlkpM', name: 'Frank Ocean' }],
        album: { id: '3mH6qwIy9crq0I9YQbOuDf', name: 'Blonde' },
        duration_ms: 213706,
        release_date: '2016-08-20',
    },
    {
        type: 'track',
        id: '4iZ4pt7kvcaH6Yo8UoZ4s2',
        name: 'Super Rich Kids',
        image: 'https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5',
        artists: [{ id: '2h93pZq0e7k5yf4dywlkpM', name: 'Frank Ocean' }],
        album: { id: '392p3shh2jkxUxY2VHvlH8', name: 'channel ORANGE' },
        duration_ms: 301533,
        release_date: '2012-07-10',
    },
    {
        type: 'track',
        id: '3vQ4T78TTMOjQXGfXVKQJo',
        name: 'Redbone',
        image: 'https://i.scdn.co/image/ab67616d0000b2731c29562d6e8c1f55bb1311d5',
        artists: [{ id: '73sIBHcqh3Z3NyqHKZ7FOL', name: 'Childish Gambino' }],
        album: { id: '4JCybsNZUXWrK2Jpyn12Ni', name: '"Awaken, My Love!"' },
        duration_ms: 326853,
        release_date: '2016-12-02',
    },
    {
        type: 'track',
        id: '3ee8Jmje8o58CHK66QrVC2',
        name: 'Motion Sickness',
        image: 'https://i.scdn.co/image/ab67616d0000b273f81edf20f49b0a541c6bc4b7',
        artists: [{ id: '1hLiboQ98IQWhpKeP9vRFw', name: 'Phoebe Bridgers' }],
        album: { id: '4I9hJTJkOGv7QVoVQdCo0B', name: 'Stranger in the Alps' },
        duration_ms: 231978,
        release_date: '2017-09-22',
    },
]

export const featuredTracksData: RowModuleData = {
    items: rotateBy(tracks, 0),
    moreHref: '/tracks/search',
}

export const recentlyReviewedTracksData: RowModuleData = {
    items: rotateBy(tracks, 3),
    moreHref: '/tracks/search',
}

export const popularTracksThisWeek: TrackDetail[] = rotateBy(tracks, 1).slice(0, 10)
