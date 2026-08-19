interface TimeApi {
	createdAt: Date;
	updatedAt: Date;
}

interface Pagination {
	page: number;
	totalItem: number;
	totalPage: number;
}

export type { TimeApi, Pagination };
