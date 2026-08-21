import { queryOptions } from "@tanstack/react-query";
import type { CustomerQuery } from "#/types/customer.type";
import {
	getCustomerByIdFn,
	getCustomersFn,
} from "../services/customer.service";

const customersQuery = (data: CustomerQuery) =>
	queryOptions({
		queryKey: ["customers", data.page],
		queryFn: () => getCustomersFn({ data }),
	});

const customerQueryById = (customerId: string) =>
	queryOptions({
		queryKey: ["customers", customerId],
		queryFn: () => getCustomerByIdFn({ data: { customerId } }),
	});
export { customersQuery, customerQueryById };
