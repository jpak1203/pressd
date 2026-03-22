import { useState, useEffect, useRef } from 'react';
import type { ItemDetail, ItemType } from '@/features/detail/types/detail';
import { fetchItemFromCatalog } from '@/features/detail/api/detailApi';
import { lookupSpotifyItem } from '@/services/spotify/service';

export const useItemFallback = (
	type: ItemType,
	id: string | undefined,
	initialItem: ItemDetail | null,
): { item: ItemDetail | null; isLoading: boolean; error: string | null } => {
	const initialItemRef = useRef(initialItem);
	const [item, setItem] = useState<ItemDetail | null>(initialItem);
	const [isLoading, setIsLoading] = useState(
		initialItem === null && id !== undefined,
	);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		if (initialItemRef.current !== null || id === undefined) return;

		let cancelled = false;
		const controller = new AbortController();

		const load = async () => {
			try {
				let result = await fetchItemFromCatalog(type, id);

				if (!result) {
					result = await lookupSpotifyItem(type, id, controller.signal);
				}

				if (cancelled) return;

				try {
					sessionStorage.setItem(`pressd_item_${id}`, JSON.stringify(result));
				} catch {
					// ignore storage errors
				}

				setItem(result);
			} catch (err) {
				if (cancelled) return;
				setError(err instanceof Error ? err.message : 'Failed to load item');
			} finally {
				if (!cancelled) setIsLoading(false);
			}
		};

		load();

		return () => {
			cancelled = true;
			controller.abort();
		};
	}, [type, id]);

	return { item, isLoading, error };
};
