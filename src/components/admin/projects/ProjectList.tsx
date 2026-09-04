import { Link } from "@tanstack/react-router";
import {
	ArrowDownWideNarrowIcon,
	ArrowUpNarrowWideIcon,
	InfoIcon,
	ListFilterIcon,
	PackageOpenIcon,
	PlusIcon,
	Trash2Icon,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyTitle,
} from "#/components/ui/empty";
import { Field, FieldLabel, FieldSet } from "#/components/ui/field";
import { cn } from "#/lib/utils";
import type { TimeApi } from "#/types/base-api.type";
import type { ProjectItem as ProjectItemApi } from "#/types/project.type";
import { ProjectItem } from "./ProjectItem";

export function ProjectList({
	projects,
}: {
	projects: Array<ProjectItemApi & TimeApi>;
}) {
	return (
		<div className="space-y-4">
			<div
				className={cn(
					"flex justify-between items-center",
					projects.length === 0 && "opacity-50 pointer-events-none",
				)}
			>
				<div className="flex items-center gap-2 py-2">
					<FieldSet className="pl-2">
						<Field orientation={"horizontal"}>
							<Checkbox id="projects-select-all" />
							<FieldLabel
								htmlFor="projects-select-all"
								className="max-sm:hidden"
							>
								Chọn tất cả
							</FieldLabel>
						</Field>
					</FieldSet>
					<Button variant={"ghost"}>
						<Trash2Icon />
						<span>Xóa dự án</span>
					</Button>
				</div>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>
							<ListFilterIcon />
							<span>Sắp xếp</span>
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<ArrowDownWideNarrowIcon />
							<span>Mới nhất</span>
						</DropdownMenuItem>
						<DropdownMenuItem>
							<ArrowUpNarrowWideIcon />
							<span>Cũ nhất</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<ul className="border border-dashed rounded-md">
				{projects?.length > 0 ? (
					projects.map((project) => (
						<ProjectItem key={project.id} item={project} />
					))
				) : (
					<li className="p-4 text-center flex flex-col gap-4 justify-center items-center">
						<Empty>
							<EmptyHeader>
								<div className="inline-flex p-2 rounded-md bg-muted">
									<PackageOpenIcon className="text-muted-foreground" />
								</div>
								<EmptyTitle>Chưa có dự án nào!</EmptyTitle>
								<EmptyDescription>
									Hiện tại bạn chưa có dự án nào! Hãy thêm dự án mới
								</EmptyDescription>
							</EmptyHeader>
							<EmptyContent>
								<Button asChild variant={"outline"}>
									<Link to="/admin/projects/new">
										<PlusIcon />
										<span>Thêm dự án mới</span>
									</Link>
								</Button>
								<div className="flex items-center gap-2">
									<InfoIcon size={12} />
									<p className="text-sm text-muted-foreground">
										Danh sách này sẽ được hiển thị tại mục{" "}
										<span className="font-semibold">Dự án</span>
									</p>
								</div>
							</EmptyContent>
						</Empty>
					</li>
				)}
			</ul>
		</div>
	);
}
