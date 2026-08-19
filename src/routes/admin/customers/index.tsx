import { createFileRoute, Link } from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { CustomerActions } from "#/components/admin/customer/CustomerActions";
import { CustomerList } from "#/components/admin/customer/CustomerList";
import { SearchCustomer } from "#/components/admin/customer/SearchCustomer";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { customersQuery } from "#/db/query/customer.query";
import { AppPagination } from "#/components/base/AppPagination";

export const Route = createFileRoute("/admin/customers/")({
	component: RouteComponent,
	loader: ({ context }) =>
		context.queryClient.prefetchQuery(customersQuery({ page: 1 })),
});

function RouteComponent() {
	return (
		<div className="py-4 spy-8">
			<div className="flex items-center gap-2 justify-end">
				<Button asChild>
					<Link to={"/admin/customers/create-customer"}>
						<PlusIcon />
						<span>Thêm khách hàng mới</span>
					</Link>
				</Button>
			</div>
			<div className="space-y-4">
				<div className="flex flex-wrap justify-between items-center gap-4 py-4">
					<h2>Danh sách khách hàng</h2>
					<SearchCustomer />
				</div>
				<CustomerActions />
				<Suspense
					fallback={
						<div className="border border-dashed rounded-md py-8">
							<div className="p-4 size-full flex flex-col justify-center items-center gap-4">
								<Spinner />
								<p className="text-lg font-semibold text-muted-foreground">
									Đang tải dữ liệu... Vui lòng chờ trong giây lát!
								</p>
							</div>
						</div>
					}
				>
					<CustomerList />
				</Suspense>
				<AppPagination />
			</div>
		</div>
	);
}
