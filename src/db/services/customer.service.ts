import { createServerFn } from "@tanstack/react-start";
import type { CustomerQuery } from "#/types/customer.type";
import { authMiddleware } from "../middleware/auth.middleware";
import {
	createCustomerServer,
	getCustomersServer,
} from "../server/customer.server";
import type { CreateCustomer } from "#/schema/customer.schema";

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

export { getCustomersFn, createCustomerFn };
