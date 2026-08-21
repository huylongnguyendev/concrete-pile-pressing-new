import { createServerFn } from "@tanstack/react-start";
import type { Company } from "#/types/company.type";
import { authMiddleware } from "../middleware/auth.middleware";
import {
	getCompanyServer,
	updateCompanyServer,
} from "../server/company.server";

const getCompanyFn = createServerFn({ method: "GET" }).handler(
	async () => await getCompanyServer(),
);

const updateCompanyFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: Company) => data)
	.handler(
		async ({ context, data }) =>
			await updateCompanyServer(data, context.session.role),
	);

export { getCompanyFn, updateCompanyFn };
