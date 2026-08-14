import { createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { getCompanyFn } from "#/db/services/company.service";
import { useMemo } from "react";

export const Route = createFileRoute("/admin/company")({
	component: RouteComponent,
	loader: async () => await getCompanyFn(),
	staleTime: 60 * 1000,
});

function RouteComponent() {
	const { companies } = Route.useLoaderData();
	const company = useMemo(() => {
		if (companies === undefined || companies.length === 0) return undefined;
		const { id, address, email, phoneNumber } = companies[0];
		return { id, address, email, phoneNumber };
	}, [companies]);

	return (
		<div className="py-4">
			<h1 className="font-semibold text-xl capitalize text-primary text-center">
				Thiết lập website
			</h1>

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
	);
}
