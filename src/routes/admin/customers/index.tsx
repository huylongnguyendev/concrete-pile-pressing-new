import {
	createFileRoute,
	Link,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { PlusIcon } from "lucide-react";
import { Suspense } from "react";
import { CustomerActions } from "#/components/admin/customer/CustomerActions";
import { CustomerList } from "#/components/admin/customer/CustomerList";
import { SearchCustomer } from "#/components/admin/customer/SearchCustomer";
import { AppPagination } from "#/components/base/AppPagination";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { customersQuery } from "#/db/query/customer.query";
import type { CustomerQuery } from "#/types/customer.type";

export const Route = createFileRoute("/admin/customers/")({
	component: RouteComponent,
	validateSearch: (
		search: Record<string, string | undefined>,
	): CustomerQuery => {
		return {
			page: Number(search?.page) || 1,
			search: search?.search,
			sort:
				search.sort === "asc" || search.sort === "desc"
					? search.sort
					: undefined,
		};
	},
	loaderDeps: ({ search }) => ({
		page: search.page,
		search: search.search,
		sort: search.sort,
	}),
	loader: ({ context, deps }) =>
		context.queryClient.prefetchQuery(
			customersQuery({ page: deps.page, search: deps.search, sort: deps.sort }),
		),
});

function RouteComponent() {
	const search = useSearch({ from: Route.fullPath });
	const navigate = useNavigate({ from: Route.fullPath });

	const currentPage = search.page || 1;
	const currentSort = search.sort ? search.sort : "desc";

	const handleChangePage = (page: number) => {
		navigate({ search: (prev) => ({ ...prev, page }) });
	};

	const handleSearch = (value: string) => {
		navigate({ search: (prev) => ({ ...prev, search: value }) });
	};

	const handleSort = (value: "asc" | "desc") => {
		navigate({ search: (prev) => ({ ...prev, sort: value }) });
	};

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
					<SearchCustomer onSearch={handleSearch} />
				</div>
				<CustomerActions
					currentSelect={currentSort}
					onSort={handleSort}
				/>
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
					<CustomerList search={{ ...search, page: currentPage }} />
				</Suspense>
				<AppPagination
					currentPage={currentPage}
					onSelectPage={handleChangePage}
				/>
			</div>
		</div>
	);
}
