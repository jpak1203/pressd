import type { ReactNode } from 'react';
import type { ItemDetail, ItemType } from '@/features/detail/types/detail';

export type SearchItemRowType = {
	id: string;
	title: string;
	image: string | null;
	rating?: number | null;
	showRating: boolean;
	itemType: ItemType;
	stateData: ItemDetail;
};

export type ResultsListType = {
	title: string;
	emptyText: string;
	children: ReactNode;
	isEmpty: boolean;
};
