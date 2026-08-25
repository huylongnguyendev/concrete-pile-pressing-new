import { queryOptions } from "@tanstack/react-query";
import { getUserByIdFn } from "#/db/user.service";

const getUserByIdQuery = (userId: string) => {
	return queryOptions({
		queryKey: ["user", userId],
		queryFn: () => getUserByIdFn(),
	});
};

export { getUserByIdQuery };
