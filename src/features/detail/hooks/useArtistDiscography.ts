import { useEffect, useState } from 'react';
import { fetchArtistDiscography } from '@/features/detail/api/detailApi';
import { fetchDiscographyFromEdge } from '@/services/spotify/service';
import type { DiscographyResult } from '@/features/detail/types/detail';

type DiscographyState = DiscographyResult & { isLoading: boolean; error: string | null };

export const useArtistDiscography = (artistId: string): DiscographyState => {
	const [state, setState] = useState<DiscographyState>({
		albums: [],
		singles: [],
		isLoading: true,
		error: null,
	});

	useEffect(() => {
		const controller = new AbortController();
		setState((prev) => ({ ...prev, isLoading: true, error: null }));
		fetchArtistDiscography(artistId, (id) =>
			fetchDiscographyFromEdge(id, controller.signal),
		)
			.then(({ albums, singles }) =>
				setState({ albums, singles, isLoading: false, error: null }),
			)
			.catch((err: unknown) => {
			if (err instanceof Error && err.name === 'AbortError') return;
			const message = err instanceof Error ? err.message : 'Failed to load discography';
			setState({ albums: [], singles: [], isLoading: false, error: message });
		});
		return () => controller.abort();
	}, [artistId]);

	return state;
};
