import { keepPreviousData, queryOptions } from "@tanstack/react-query";
import { getProjectsFn } from "#/db/project.service";
import type { PaginationQuery } from "#/types/base-api.type";

const projectsQuery = (data: PaginationQuery) => {
	return queryOptions({
		queryKey: ["projects", "list", data.page],
		queryFn: () => getProjectsFn({ data }),
		placeholderData: keepPreviousData,
		staleTime: 60 * 1000,
	});
};

export { projectsQuery };
