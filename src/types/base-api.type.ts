interface TimeApi {
	createdAt: Date;
	updatedAt: Date;
}

interface Pagination {
	page: number;
	totalItem: number;
	totalPage: number;
}

type Sort = "asc" | "desc";

interface PaginationQuery {
	page: number;
	search?: string;
	sort?: Sort;
}

export type { TimeApi, Pagination, PaginationQuery, Sort };
