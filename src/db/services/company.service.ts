import { createServerFn } from "@tanstack/react-start";
import { getCompanyServer } from "../server/company.server";

const getCompanyFn = createServerFn({ method: "GET" }).handler(
	async () => await getCompanyServer(),
);

export { getCompanyFn };
