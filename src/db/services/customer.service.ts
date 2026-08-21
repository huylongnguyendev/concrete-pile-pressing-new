import { createServerFn } from "@tanstack/react-start";
import type { CreateCustomer } from "#/schema/customer.schema";
import type { CustomerQuery } from "#/types/customer.type";
import { authMiddleware } from "../middleware/auth.middleware";
import {
	createCustomerServer,
	deleteCustomersServer,
	getCustomerByIdServer,
	getCustomersServer,
} from "../server/customer.server";

const getCustomersFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.validator((data: CustomerQuery) => data)
	.handler(
		async ({ data, context }) =>
			await getCustomersServer({ ...data, userId: context.session.userId }),
	);

const createCustomerFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: CreateCustomer) => data)
	.handler(
		async ({ data, context }) =>
			await createCustomerServer({ ...data, userId: context.session.userId }),
	);

const getCustomerByIdFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.validator((data: { customerId: string }) => data)
	.handler(
		async ({ data, context }) =>
			await getCustomerByIdServer({ ...data, userId: context.session.userId }),
	);

const deleteCustomerFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: { ids: string[] }) => data)
	.handler(
		async ({ data, context }) =>
			await deleteCustomersServer({ ...data, role: context.session.role }),
	);

export {
	getCustomersFn,
	createCustomerFn,
	getCustomerByIdFn,
	deleteCustomerFn,
};
