import { queryOptions } from "@tanstack/react-query";
import type { CustomerQuery } from "#/types/customer.type";
import { getCustomersFn } from "../services/customer.service";

const customersQuery = (data: CustomerQuery) =>
	queryOptions({
		queryKey: ["customers", data.page],
		queryFn: () => getCustomersFn({ data }),
	});

export { customersQuery };
