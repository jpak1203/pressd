import type {
  GridModuleData,
  RowModuleData,
} from "@/features/home-page/types/home-page";
import type {
  AlbumDetail,
  ArtistDetail,
  ItemDetail,
  TrackDetail,
} from "@/features/detail/types/detail";

const tracks: TrackDetail[] = [
  {
    type: "track",
    id: "1yYlpGuBiRRf33e1gY61bN",
    name: "Night Shift",
    image: "https://i.scdn.co/image/ab67616d0000b2736c3ce277efb2276dd13991a0",
    artists: [{ id: "07D1Bjaof0NFlU32KXiqUP", name: "Lucy Dacus" }],
    album: { id: "0LqhbUfmHsxovfSirhEIGu", name: "Historian" },
    duration_ms: 391829,
    release_date: "2018-03-02",
  },
  {
    type: "track",
    id: "4k6Uh1HXdhtusDW5y8Gbvy",
    name: "Bad Habit",
    image: "https://i.scdn.co/image/ab67616d0000b2736938311000a0e494a26986e5",
    artists: [{ id: "57vWImR43h4CaDao012Ofp", name: "Steve Lacy" }],
    album: { id: "3Ks0eeH0GWpY4AU20D5HPD", name: "Gemini Rights" },
    duration_ms: 232114,
    release_date: "2022-07-15",
  },
  {
    type: "track",
    id: "6kj8TeHSns33wt1Z1wdmMx",
    name: "Solar Power",
    image: "https://i.scdn.co/image/ab67616d0000b27336615a0a60523dd62135ab3a",
    artists: [{ id: "163tK9Wjr9P9DmM0AVK7lm", name: "Lorde" }],
    album: { id: "4SBl4zvNIL4H137YRf2P0J", name: "Solar Power" },
    duration_ms: 399583,
    release_date: "2021-06-10",
  },
  {
    type: "track",
    id: "0WbMK4wrZ1wFSty9F7FCgu",
    name: "Good Luck, Babe!",
    image: "https://i.scdn.co/image/ab67616d0000b27391b4bc7c88d91a42e0f3a8b7",
    artists: [{ id: "7GlBOeep6PqTfFi59PTUUN", name: "Chappell Roan" }],
    album: {
      id: "1WAjjRMfZjEXtB0lQrAw6Q",
      name: "The Rise and Fall of a Midwest Princess",
    },
    duration_ms: 218423,
    release_date: "2024-04-05",
  },
  {
    type: "track",
    id: "2LMkwUfqC6S6s6qDVlEuzV",
    name: "White Ferrari",
    image: "https://i.scdn.co/image/ab67616d0000b273c5649add07ed3720be9d5526",
    artists: [{ id: "2h93pZq0e7k5yf4dywlkpM", name: "Frank Ocean" }],
    album: {
      id: "3mH6qwIy9crq0I9YQbOuDf",
      name: "Blonde",
    },
    duration_ms: 248807,
    release_date: "2016-08-20",
  },
  {
    type: "track",
    id: "7IVukH71OXfAu3KudrrizN",
    name: "Japanese Denim",
    duration_ms: 270556,
    artists: [{ id: "20wkVLutqVOYrc0kxFs7rA", name: "Daniel Caesar" }],
    album: {
      id: "5QHoG6laR98M4SZumgSLkB",
      name: "Freudian",
    },
    image: "https://i.scdn.co/image/ab67616d0000b2737465bef53d9e3a27c63c7a1d",
    release_date: "2016-10-21",
  },
];

const albums: AlbumDetail[] = [
  {
    type: "album",
    id: "1ORxRsK3MrSLvh7VQTF01F",
    name: "Ultraviolence (Deluxe)",
    image: "https://i.scdn.co/image/ab67616d0000b2731624590458126fc8b8c64c2f",
    artists: [{ id: "00FQb4jTyendYWaN8pK0wa", name: "Lana Del Rey" }],
    release_date: "2014-01-01",
    total_tracks: 14,
    album_type: "album",
  },
  {
    type: "album",
    id: "5zi7WsKlIiUXv09tbGLKsE",
    name: "IGOR",
    image: "https://i.scdn.co/image/ab67616d0000b27330a635de2bb0caa4e26f6abb",
    artists: [{ id: "4V8LLVI7PbaPR0K2TGSxFF", name: "Tyler, the Creator" }],
    release_date: "2019-05-17",
    total_tracks: 12,
    album_type: "album",
  },
  {
    type: "album",
    id: "392p3shh2jkxUxY2VHvlH8",
    name: "channel ORANGE",
    album_type: "album",
    total_tracks: 17,
    image: "https://i.scdn.co/image/ab67616d0000b2737aede4855f6d0d738012e2e5",
    release_date: "2012-07-10",
    artists: [{ id: "2h93pZq0e7k5yf4dywlkpM", name: "Frank Ocean" }],
  },
  {
    type: "album",
    id: "2LKW0m9cC63QzEI9tJH3ql",
    name: "Son Of Spergy",
    album_type: "album",
    total_tracks: 12,
    image: "https://i.scdn.co/image/ab67616d0000b2732bad6e56e77d5bef0aa3f2dc",
    release_date: "2025-10-24",
    artists: [{ id: "20wkVLutqVOYrc0kxFs7rA", name: "Daniel Caesar" }],
  },
  {
    type: "album",
    id: "1tEu6qNPURb0YfjaRDK23w",
    name: "AAA",
    album_type: "album",
    total_tracks: 8,
    image: "https://i.scdn.co/image/ab67616d0000b2735171417ebf322de1640e3478",
    release_date: "2024-07-10",
    artists: [
      { id: "57okaLdCtv3nVBSn5otJkp", name: "HYUKOH" },
      { id: "7BqRcZsHYYQeqMAOp7e532", name: "落日飛車 Sunset Rollercoaster" },
    ],
  },
  {
    type: "album",
    id: "6zCMXqMsxHjn534g67bxVK",
    name: "Heaven Ain't Sold",
    album_type: "album",
    total_tracks: 11,
    image: "https://i.scdn.co/image/ab67616d0000b273124c201730efde64b45eff79",
    release_date: "2026-02-20",
    artists: [{ id: "5XQRfs0gXs30aWUn1Umves", name: "Choker" }],
  },
];

const artists: ArtistDetail[] = [
  {
    type: "artist",
    id: "7MoIc5s9KXolCBH1fy9kkw",
    name: "Japanese Breakfast",
    image: "https://i.scdn.co/image/ab6761610000e5eb679cee0110b7cc128a496431",
    genres: [],
    popularity: 58,
  },
  {
    type: "artist",
    id: "1hLiboQ98IQWhpKeP9vRFw",
    name: "boygenius",
    image: "https://i.scdn.co/image/ab6761610000e5eb1a6373c01e8b86e289859f57",
    genres: [],
    popularity: null,
  },
  {
    type: "artist",
    id: "0du5cEVh5yTK9QJze8zA0C",
    name: "Bruno Mars",
    image: "https://i.scdn.co/image/ab6761610000e5ebc7688aad1bf03986934d7e26",
    genres: [],
    popularity: null,
  },
  {
    type: "artist",
    id: "13ubrt8QOOCPljQ2FL1Kca",
    name: "A$AP Rocky",
    image: "https://i.scdn.co/image/ab6761610000e5ebad160b333f9a240f84aff7d7",
    genres: [],
    popularity: null,
  },
  {
    type: "artist",
    id: "6qqNVTkY8uBg9cP3Jd7DAH",
    name: "Billie Eilish",
    image: "https://i.scdn.co/image/ab6761610000f1784a21b4760d2ecb7b0dcdc8da",
    genres: [],
    popularity: null,
  },
  {
    type: "artist",
    id: "2YZyLoL8N0Wb9xBt1NhZWg",
    name: "Kendrick Lamar",
    image: "https://i.scdn.co/image/ab6761610000e5eb39ba6dcd4355c03de0b50918",
    genres: [],
    popularity: null,
  },
];

const shuffleLike = (offset: number, pool: ItemDetail[]): ItemDetail[] =>
  pool.map((_, index) => pool[(index + offset) % pool.length]);

export const featuredSongsData: RowModuleData = {
  items: shuffleLike(0, tracks),
  moreHref: "/playlists/featured-songs",
};

export const newFromFriendsData: RowModuleData = {
  items: shuffleLike(1, tracks),
  moreHref: "/playlists/new-from-friends",
};

export const popularWithFriendsData: RowModuleData = {
  items: shuffleLike(2, tracks),
  moreHref: "/playlists/popular-with-friends",
};

export const newSongsData: RowModuleData = {
  items: shuffleLike(3, tracks),
  moreHref: "/playlists/new-songs",
};

export const featuredArtistsData: RowModuleData = {
  items: shuffleLike(0, artists),
  moreHref: "/playlists/featured-artists",
};

export const featuredAlbumsData: RowModuleData = {
  items: shuffleLike(0, albums),
  moreHref: "/playlists/featured-albums",
};

export const featuredReviewsData: GridModuleData = {
  moreHref: "/reviews/featured",
  items: [
    {
      id: "review-1",
      reviewer: {
        name: "David Sims",
        avatarUrl: "https://i.pravatar.cc/96?img=12",
        href: "/users/david-sims",
      },
      song: {
        title: "Good Luck, Babe!",
        artist: {
          name: "Chappell Roan",
          href: "/artists/chappell-roan",
        },
        releaseYear: 2024,
        artworkUrl:
          "https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=320&q=80",
        href: "/songs/good-luck-babe",
      },
      userRating: 4.8,
      reviewText:
        "The chorus lands like a neon explosion and somehow still feels raw. This one is impossible to skip.",
      reviewLikes: 397,
    },
    {
      id: "review-2",
      reviewer: {
        name: "cerys",
        avatarUrl: "https://i.pravatar.cc/96?img=36",
        href: "/users/cerys",
      },
      song: {
        title: "Diet Pepsi",
        artist: {
          name: "Addison Rae",
          href: "/artists/addison-rae",
        },
        releaseYear: 2024,
        artworkUrl:
          "https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=320&q=80",
        href: "/songs/diet-pepsi",
      },
      userRating: 3.9,
      reviewText:
        "It has this glossy throwback energy that should not work, but it keeps getting stuck in my head every morning.",
      reviewLikes: 267,
    },
    {
      id: "review-3",
      reviewer: {
        name: "Sam Williams",
        avatarUrl: "https://i.pravatar.cc/96?img=7",
        href: "/users/sam-williams",
      },
      song: {
        title: "Night Shift",
        artist: {
          name: "Lucy Dacus",
          href: "/artists/lucy-dacus",
        },
        releaseYear: 2018,
        artworkUrl:
          "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=320&q=80",
        href: "/songs/night-shift",
      },
      userRating: 4.6,
      reviewText:
        "Every time the final section hits, it feels like the entire room opens up. One of the best song endings in years.",
      reviewLikes: 143,
    },
    {
      id: "review-4",
      reviewer: {
        name: "Jack Moulton",
        avatarUrl: "https://i.pravatar.cc/96?img=20",
        href: "/users/jack-moulton",
      },
      song: {
        title: "Redbone",
        artist: {
          name: "Childish Gambino",
          href: "/artists/childish-gambino",
        },
        releaseYear: 2016,
        artworkUrl:
          "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=320&q=80",
        href: "/songs/redbone",
      },
      userRating: 4.5,
      reviewText:
        "The bass line alone deserves five stars. Still sounds futuristic and warm at the same time.",
      reviewLikes: 211,
    },
  ],
};
