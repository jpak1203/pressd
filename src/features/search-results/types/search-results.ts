export type SeachItemRowType = {
	id: string;
	title: string;
	image: string | null;
	rating?: number | null;
	showRating: boolean;
};

export type ResultsListType = {
	title: string;
	emptyText: string;
	children: React.ReactNode;
	isEmpty: boolean;
};
