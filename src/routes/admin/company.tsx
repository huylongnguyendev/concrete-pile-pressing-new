import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Contact } from "#/components/admin/website/contact/Contact";
import { Display } from "#/components/admin/website/display/Display";
import { ConfirmPassword } from "#/components/dialog/ConfirmPassword";
import { getCompanyFn } from "#/db/services/company.service";
import type { Company } from "#/types/company.type";

export const Route = createFileRoute("/admin/company")({
	component: RouteComponent,
	loader: async () => await getCompanyFn(),
	staleTime: 60 * 1000,
});

function RouteComponent() {
	const { companies } = Route.useLoaderData();

	const company = useMemo(() => {
		if (companies.length === 0)
			return {
				addresses: [{ id: "", address: "" }],
				emails: [{ id: "", mail: "" }],
				phoneNumber: [{ id: "", number: "" }],
				id: "",
			} as Company;

		const { id, addresses, emails, phoneNumber } = companies[0];
		return { id, addresses, emails, phoneNumber };
	}, [companies]);

	return (
		<div className="py-4 space-y-8">
			<h1 className="font-semibold text-xl capitalize text-primary text-center">
				Thiết lập website
			</h1>

			<div className="space-y-6">
				<Contact company={company} />
				<Display />
			</div>
			<ConfirmPassword />
		</div>
	);
}
