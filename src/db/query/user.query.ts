import { queryOptions } from "@tanstack/react-query";
import { getUserFn } from "../services/user.service";

const userQuery = queryOptions({
	queryKey: ["user"],
	queryFn: () => getUserFn(),
  staleTime: 5 * 60 * 1000
});

export { userQuery };
