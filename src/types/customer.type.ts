import type { CreateCustomer } from "#/schema/customer.schema";

interface CustomerQuery {
	search?: string;
	sort?: "asc" | "desc";
	page: number;
}

interface Customer extends Omit<CreateCustomer, "location"> {
	id: string;
}

export type { CustomerQuery, Customer };
