import { useSuspenseQuery } from "@tanstack/react-query";
import {
	createFileRoute,
	useNavigate,
	useSearch,
} from "@tanstack/react-router";
import { ProjectAction } from "#/components/admin/projects/ProjectAction";
import { ProjectList } from "#/components/admin/projects/ProjectList";
import { AppPagination } from "#/components/base/AppPagination";
import { projectsQuery } from "#/lib/query/project.query";
import type { PaginationQuery, Sort } from "#/types/base-api.type";

export const Route = createFileRoute("/admin/projects/")({
	component: RouteComponent,
	validateSearch: (searchParams: Record<string, unknown>): PaginationQuery => ({
		page: Number(searchParams?.page ?? 1),
		search: typeof searchParams?.search === "string" ? searchParams.search : "",
		sort: (searchParams?.sort as Sort) || "desc",
	}),
	loaderDeps: ({ search }): PaginationQuery => ({
		page: search?.page ?? 1,
		search: typeof search?.search === "string" ? search.search : "",
		sort: search?.sort ?? "desc",
	}),
	loader: ({ context, deps }) =>
		context.queryClient.prefetchQuery(projectsQuery(deps)),
});

function RouteComponent() {
	const searchParams = useSearch({ from: "/admin/projects/" });
	const navigate = useNavigate();

	const { data } = useSuspenseQuery(projectsQuery(searchParams));

	const currentPage = Number(searchParams.page) ?? 1;

	const handleSelectPage = (page: number) => {
		navigate({
			from: "/admin/projects/",
			search: (prev) => ({ ...prev, page }),
		});
	};

	const handleSearch = (value: string) => {
		navigate({
			from: "/admin/projects/",
			search: (prev) => ({ ...prev, search: value, page: 1 }),
		});
	};

	return (
		<div className="py-2 space-y-6">
			<h1 className="font-semibold border-l-4 border-primary pl-2">
				<p className="text-lg">Quản lý dự án</p>
				<p className="text-sm text-muted-foreground">
					Quản lý danh mục các dự án của bạn
				</p>
			</h1>
			<ProjectAction
				value={searchParams.search ?? ""}
				items={data.totalItem ?? 0}
				onSearchChange={handleSearch}
			/>
			<ProjectList projects={data.projects} />
			{data?.success ? (
				<AppPagination
					currentPage={currentPage}
					onSelectPage={handleSelectPage}
					totalPages={data.totalPage}
				/>
			) : null}
		</div>
	);
}
