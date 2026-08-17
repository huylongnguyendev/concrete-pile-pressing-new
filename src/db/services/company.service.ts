import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "../middleware/auth.middleware";
import {
	getCompanyServer,
	updateCompanyServer,
} from "../server/company.server";
import type { Company } from "#/types/company.type";

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
