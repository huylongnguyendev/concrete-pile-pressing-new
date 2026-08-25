import { Link } from "@tanstack/react-router";
import {
	ChevronRightIcon,
	LayoutDashboardIcon,
	SettingsIcon,
	UserIcon,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	Sidebar,
	SidebarContent,
	SidebarFooter,
	SidebarGroup,
	SidebarGroupContent,
	SidebarGroupLabel,
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "#/components/ui/sidebar";
import { sidebarList } from "#/data/sidebar.data";
import { cn } from "#/lib/utils";

export function AppSidebar({ userId }: { userId: string }) {
	const { open } = useSidebar();

	const overviewItem = sidebarList.find(
		(sidebar) => sidebar.type === "overview",
	);
	const manageItems = sidebarList.filter(
		(sidebar) => sidebar.type === "manage",
	);

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader className="p-4">
				<div className="font-bold text-lg flex items-center gap-2">
					{open ? <span>Logo App</span> : <span>L</span>}
				</div>
			</SidebarHeader>

			<SidebarContent>
				<SidebarGroup>
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild tooltip={"Tổng quan"}>
								<Link to={"/admin"}>
									<LayoutDashboardIcon />
									<span>Tổng quan</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
						{overviewItem && (
							<SidebarMenuItem>
								<SidebarMenuButton asChild tooltip={overviewItem.label}>
									<Link to={overviewItem.href}>
										<overviewItem.icon />
										<span>{overviewItem.label}</span>
									</Link>
								</SidebarMenuButton>
							</SidebarMenuItem>
						)}
					</SidebarMenu>
				</SidebarGroup>

				{/* Nhóm Quản lý (Manage) */}
				<SidebarGroup>
					{open && <SidebarGroupLabel>Quản lý hệ thống</SidebarGroupLabel>}
					<SidebarGroupContent>
						<SidebarMenu>
							{manageItems.map((item) => {
								const IconComponent = item.icon;
								return (
									<SidebarMenuItem key={item.id}>
										<SidebarMenuButton asChild tooltip={item.label}>
											<Link to={item.href}>
												<IconComponent />
												<span>{item.label}</span>
											</Link>
										</SidebarMenuButton>
									</SidebarMenuItem>
								);
							})}
						</SidebarMenu>
					</SidebarGroupContent>
				</SidebarGroup>
			</SidebarContent>

			<SidebarFooter className="p-2">
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip="Thiết lập ứng dụng">
							<Link to="/admin/settings">
								<SettingsIcon />
								<span>Thiết lập ứng dụng</span>
							</Link>
						</SidebarMenuButton>
					</SidebarMenuItem>
					<SidebarMenuItem>
						<SidebarMenuButton asChild tooltip={"Tài khoản"}>
							<Button
								variant={"outline"}
								size={open ? "default" : "icon"}
								className={cn("w-full", open && "justify-between h-10")}
								asChild
							>
								<Link to="/admin/$userId" params={{ userId }}>
									{open ? (
										<>
											<div className="inline-flex justify-center items-center gap-1">
												<UserIcon />
												<span>Tài khoản</span>
											</div>
											<ChevronRightIcon />
										</>
									) : (
										<UserIcon />
									)}
								</Link>
							</Button>
						</SidebarMenuButton>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
