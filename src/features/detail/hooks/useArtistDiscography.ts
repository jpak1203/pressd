import { useEffect, useState } from 'react';
import { fetchArtistDiscography } from '@/features/detail/api/detailApi';
import { fetchDiscographyFromEdge } from '@/services/spotify/service';
import type { DiscographyResult } from '@/features/detail/types/detail';

type DiscographyState = DiscographyResult & { isLoading: boolean };

export const useArtistDiscography = (artistId: string): DiscographyState => {
	const [state, setState] = useState<DiscographyState>({
		albums: [],
		singles: [],
		isLoading: true,
	});

	useEffect(() => {
		const controller = new AbortController();
		fetchArtistDiscography(artistId, (id) =>
			fetchDiscographyFromEdge(id, controller.signal),
		)
			.then(({ albums, singles }) =>
				setState({ albums, singles, isLoading: false }),
			)
			.catch((err: unknown) => {
			if (err instanceof Error && err.name === 'AbortError') return;
			setState({ albums: [], singles: [], isLoading: false });
		});
		return () => controller.abort();
	}, [artistId]);

	return state;
};
