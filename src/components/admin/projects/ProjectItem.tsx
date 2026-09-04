import { Link } from "@tanstack/react-router";
import { EditIcon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import type { ProjectItem as ProjectItemApi } from "#/types/project.type";

export function ProjectItem({ item }: { item: ProjectItemApi }) {
	return (
		<li className="group flex items-center gap-2 px-2 py-4 rounded-md hover:bg-accent/30 transition-colors duration-300">
			<Checkbox />
			<Link
				to="/admin/projects/$projectId"
				params={{ projectId: "1" }}
				className="w-full group-hover:text-primary transition-colors duration-300"
			>
				Tên dự án
			</Link>
			<div className="flex items-center max-sm:hidden">
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant={"ghost"} size={"icon-sm"}>
							<EditIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Sửa dự án</TooltipContent>
				</Tooltip>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant={"ghost"} size={"icon-sm"}>
							<Trash2Icon className="text-destructive" />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Xóa dự án</TooltipContent>
				</Tooltip>
			</div>
			<div className="sm:hidden">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"ghost"} size={"icon-sm"}>
							<EllipsisVerticalIcon />
						</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>
							<EditIcon />
							<span>Sửa dự án</span>
						</DropdownMenuItem>
						<DropdownMenuItem variant="destructive">
							<Trash2Icon />
							<span>Xóa dự án</span>
						</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
		</li>
	);
}
