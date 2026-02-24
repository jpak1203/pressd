export type SongRowItem = {
	id: string;
	title: string;
	artist: {
		name: string;
		href: string;
	};
	releaseDate: string;
	averageRating: number;
	artworkUrl: string;
	href: string;
};

export type RowModuleData = {
	items: SongRowItem[];
	moreHref: string;
};

export type FeaturedReviewItem = {
	id: string;
	reviewer: {
		name: string;
		avatarUrl: string;
		href: string;
	};
	song: {
		title: string;
		artist: {
			name: string;
			href: string;
		};
		releaseYear: number;
		artworkUrl: string;
		href: string;
	};
	userRating: number;
	reviewText: string;
	reviewLikes: number;
};

export type GridModuleData = {
	items: FeaturedReviewItem[];
	moreHref: string;
};
