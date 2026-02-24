import type {
	GridModuleData,
	RowModuleData,
	SongRowItem,
} from '@/features/home-page/types/home-page';

const songs: SongRowItem[] = [
	{
		id: 'song-1',
		title: 'Night Shift',
		artist: {
			name: 'Lucy Dacus',
			href: '/artists/lucy-dacus',
		},
		releaseDate: '2018',
		averageRating: 4.6,
		artworkUrl:
			'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?auto=format&fit=crop&w=640&q=80',
		href: '/songs/night-shift',
	},
	{
		id: 'song-2',
		title: 'Bad Habit',
		artist: {
			name: 'Steve Lacy',
			href: '/artists/steve-lacy',
		},
		releaseDate: '2022',
		averageRating: 4.2,
		artworkUrl:
			'https://images.unsplash.com/photo-1511379938547-c1f69419868d?auto=format&fit=crop&w=640&q=80',
		href: '/songs/bad-habit',
	},
	{
		id: 'song-3',
		title: 'Solar Power',
		artist: {
			name: 'Lorde',
			href: '/artists/lorde',
		},
		releaseDate: '2021',
		averageRating: 3.9,
		artworkUrl:
			'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?auto=format&fit=crop&w=640&q=80',
		href: '/songs/solar-power',
	},
	{
		id: 'song-4',
		title: 'Redbone',
		artist: {
			name: 'Childish Gambino',
			href: '/artists/childish-gambino',
		},
		releaseDate: '2016',
		averageRating: 4.8,
		artworkUrl:
			'https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=640&q=80',
		href: '/songs/redbone',
	},
	{
		id: 'song-5',
		title: 'Diet Pepsi',
		artist: {
			name: 'Addison Rae',
			href: '/artists/addison-rae',
		},
		releaseDate: '2024',
		averageRating: 3.7,
		artworkUrl:
			'https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=640&q=80',
		href: '/songs/diet-pepsi',
	},
	{
		id: 'song-6',
		title: 'Good Luck, Babe!',
		artist: {
			name: 'Chappell Roan',
			href: '/artists/chappell-roan',
		},
		releaseDate: '2024',
		averageRating: 4.7,
		artworkUrl:
			'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=640&q=80',
		href: '/songs/good-luck-babe',
	},
];

const shuffleLike = (offset: number) =>
	songs.map((_, index) => songs[(index + offset) % songs.length]);

export const featuredSongsData: RowModuleData = {
	items: songs,
	moreHref: '/playlists/featured-songs',
};

export const newFromFriendsData: RowModuleData = {
	items: shuffleLike(1),
	moreHref: '/playlists/new-from-friends',
};

export const popularWithFriendsData: RowModuleData = {
	items: shuffleLike(2),
	moreHref: '/playlists/popular-with-friends',
};

export const newSongsData: RowModuleData = {
	items: shuffleLike(3),
	moreHref: '/playlists/new-songs',
};

export const featuredReviewsData: GridModuleData = {
	moreHref: '/reviews/featured',
	items: [
		{
			id: 'review-1',
			reviewer: {
				name: 'David Sims',
				avatarUrl: 'https://i.pravatar.cc/96?img=12',
				href: '/users/david-sims',
			},
			song: {
				title: 'Good Luck, Babe!',
				artist: {
					name: 'Chappell Roan',
					href: '/artists/chappell-roan',
				},
				releaseYear: 2024,
				artworkUrl:
					'https://images.unsplash.com/photo-1516280440614-37939bbacd81?auto=format&fit=crop&w=320&q=80',
				href: '/songs/good-luck-babe',
			},
			userRating: 4.8,
			reviewText:
				'The chorus lands like a neon explosion and somehow still feels raw. This one is impossible to skip.',
			reviewLikes: 397,
		},
		{
			id: 'review-2',
			reviewer: {
				name: 'cerys',
				avatarUrl: 'https://i.pravatar.cc/96?img=36',
				href: '/users/cerys',
			},
			song: {
				title: 'Diet Pepsi',
				artist: {
					name: 'Addison Rae',
					href: '/artists/addison-rae',
				},
				releaseYear: 2024,
				artworkUrl:
					'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?auto=format&fit=crop&w=320&q=80',
				href: '/songs/diet-pepsi',
			},
			userRating: 3.9,
			reviewText:
				'It has this glossy throwback energy that should not work, but it keeps getting stuck in my head every morning.',
			reviewLikes: 267,
		},
		{
			id: 'review-3',
			reviewer: {
				name: 'Sam Williams',
				avatarUrl: 'https://i.pravatar.cc/96?img=7',
				href: '/users/sam-williams',
			},
			song: {
				title: 'Night Shift',
				artist: {
					name: 'Lucy Dacus',
					href: '/artists/lucy-dacus',
				},
				releaseYear: 2018,
				artworkUrl:
					'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=320&q=80',
				href: '/songs/night-shift',
			},
			userRating: 4.6,
			reviewText:
				'Every time the final section hits, it feels like the entire room opens up. One of the best song endings in years.',
			reviewLikes: 143,
		},
		{
			id: 'review-4',
			reviewer: {
				name: 'Jack Moulton',
				avatarUrl: 'https://i.pravatar.cc/96?img=20',
				href: '/users/jack-moulton',
			},
			song: {
				title: 'Redbone',
				artist: {
					name: 'Childish Gambino',
					href: '/artists/childish-gambino',
				},
				releaseYear: 2016,
				artworkUrl:
					'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=320&q=80',
				href: '/songs/redbone',
			},
			userRating: 4.5,
			reviewText:
				'The bass line alone deserves five stars. Still sounds futuristic and warm at the same time.',
			reviewLikes: 211,
		},
	],
};
