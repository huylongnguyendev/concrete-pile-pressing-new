import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Contact } from "#/components/admin/website/Contact";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { getCompanyFn } from "#/db/services/company.service";
import type { Company } from "#/types/company.type";
import { ConfirmPassword } from "#/components/dialog/ConfirmPassword";

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

				<Card>
					<CardHeader>
						<CardTitle>Hiển thị</CardTitle>
						<CardDescription>
							Tùy chọn hiển thị trên website của bạn
						</CardDescription>
					</CardHeader>
					<CardContent></CardContent>
				</Card>
			</div>
			<ConfirmPassword />
		</div>
	);
}
