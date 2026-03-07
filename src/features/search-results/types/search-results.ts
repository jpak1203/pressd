import type { ItemDetail, ItemType } from '@/features/detail/types/detail';

export type SeachItemRowType = {
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
	children: React.ReactNode;
	isEmpty: boolean;
};
