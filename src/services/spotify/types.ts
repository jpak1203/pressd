export type UseSpotifySearchOptions = {
	type?: SpotifySearchParams['type'];
	limit?: number;
	market?: string;
	minQueryLength?: number;
	debounceMs?: number;
	enabled?: boolean;
};

export type UseSpotifySearchResult = {
	query: string;
	setQuery: (value: string) => void;
	isLoading: boolean;
	error: string | null;
	data: SpotifySearchResponse | null;
	refetch: () => Promise<void>;
};

export type SpotifySearchType =
	| 'track'
	| 'artist'
	| 'album'
	| 'track,artist,album';

export type SpotifySearchParams = {
	q: string;
	type?: SpotifySearchType;
	limit?: number;
	market?: string;
};

export type SpotifyTrackItem = {
	id: string;
	name: string;
	artists: Array<{ id: string; name: string }>;
	album: { id: string; name: string; image: string | null };
	image_url: string | null;
	release_date: string | null;
	external_url: string;
	duration_ms: number;
};

export type SpotifyArtistItem = {
	id: string;
	name: string;
	image: string | null;
	genres: string[];
	popularity: number | null;
	external_url: string;
};

export type SpotifyAlbumItem = {
	id: string;
	name: string;
	album_type: string;
	total_tracks: number;
	image: string | null;
	release_date: string;
	artists: Array<{ id: string; name: string }>;
	external_url: string;
};

export type SpotifySearchResponse = {
	tracks: SpotifyTrackItem[];
	artists: SpotifyArtistItem[];
	albums: SpotifyAlbumItem[];
	cached: boolean;
};
