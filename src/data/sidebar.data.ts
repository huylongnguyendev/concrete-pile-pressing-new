import { BarChart3, BookUser, FolderKanban, Users } from "lucide-react";

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
		icon: BarChart3,
		label: "Phân tích hệ thống",
		type: "overview",
	},
	{
		id: "manage-customers",
		href: "/admin/customers",
		icon: Users,
		label: "Quản lý khách hàng",
		type: "manage",
	},
	{
		id: "manage-projects",
		href: "/admin/projects",
		icon: FolderKanban,
		label: "Quản lý dự án",
		type: "manage",
	},
	{
		id: "manage-employees",
		href: "/admin/employees",
		icon: BookUser,
		label: "Quản lý nhân viên",
		type: "manage",
	},
];

export { sidebarList, type ISidebar };
