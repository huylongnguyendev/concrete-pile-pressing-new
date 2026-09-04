import {
	BarChart3Icon,
	FolderKanbanIcon,
	StickyNoteIcon,
	UsersIcon,
} from "lucide-react";

interface ISidebar {
	id: string;
	href: string;
	icon: React.ElementType;
	label: string;
	type: "manage" | "overview";
}

const sidebarList: ISidebar[] = [
	{
		id: "overview-analytics",
		href: "/admin/analytics",
		icon: BarChart3Icon,
		label: "Phân tích hệ thống",
		type: "overview",
	},
	{
		id: "manage-customers",
		href: "/admin/customers",
		icon: UsersIcon,
		label: "Quản lý khách hàng",
		type: "manage",
	},
	{
		id: "manage-projects",
		href: "/admin/projects",
		icon: FolderKanbanIcon,
		label: "Quản lý dự án",
		type: "manage",
	},
	{
		id: "manage-posts",
		href: "/admin/posts",
		icon: StickyNoteIcon,
		label: "Quản lý bài viết",
		type: "manage",
	},
];

export { sidebarList, type ISidebar };
