import { queryOptions } from "@tanstack/react-query";
import { getCompanyFn } from "../services/company.service";

const companyQuery = queryOptions({
	queryKey: ["company"],
	queryFn: () => getCompanyFn(),
	staleTime: 5 * 60 * 1000,
});

export { companyQuery };
