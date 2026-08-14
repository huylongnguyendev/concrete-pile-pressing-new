import { Link } from "@tanstack/react-router";
import {
	ChevronRightIcon,
	GlobeIcon,
	LayoutDashboardIcon,
	LogOutIcon,
	MessageCircleIcon,
	SettingsIcon,
	User2Icon,
	UserCog2Icon,
} from "lucide-react";
import { Badge } from "#/components/ui/badge";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
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

export function AppSidebar() {
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
						<SidebarMenuItem>
							<SidebarMenuButton
								className="relative"
								asChild
								tooltip={"Tin nhắn"}
							>
								<Link to={"/admin/message"}>
									<MessageCircleIcon />
									<span>TIn nhắn</span>
									<Badge
										className="absolute size-3 p-0 top-1 right-0"
										variant={"destructive"}
									>
										<span className="absolute size-3 bg-red-600 animate-ping" />
									</Badge>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
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

				<SidebarGroup>
					{open && <SidebarGroupLabel>Thiết lập website</SidebarGroupLabel>}
					<SidebarMenu>
						<SidebarMenuItem>
							<SidebarMenuButton asChild tooltip={"Thiết lập website"}>
								<Link to="/admin/company">
									<GlobeIcon />
									<span>Thiết lập website</span>
								</Link>
							</SidebarMenuButton>
						</SidebarMenuItem>
					</SidebarMenu>
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
						<DropdownMenu>
							<DropdownMenuTrigger asChild>
								<SidebarMenuButton
									variant={"outline"}
									className={cn(
										"justify-between h-10 w-full",
										open ||
											"bg-emerald-50 text-emerald-600 rounded-full justify-center",
									)}
								>
									{open ? (
										<>
											<div className="flex items-center gap-2">
												<User2Icon className="w-5 h-5" />
												<div className="text-left leading-tight">
													<p className="font-medium">Username</p>
													<p className="font-semibold text-xs text-muted-foreground">
														role
													</p>
												</div>
											</div>
											<ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
										</>
									) : (
										<User2Icon />
									)}
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent side="right" align="end" className="w-48">
								<DropdownMenuItem>
									<UserCog2Icon className="mr-2 w-4 h-4" />
									<span>Cài đặt tài khoản</span>
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive">
									<LogOutIcon className="mr-2 w-4 h-4" />
									<span>Đăng xuất</span>
								</DropdownMenuItem>
							</DropdownMenuContent>
						</DropdownMenu>
					</SidebarMenuItem>
				</SidebarMenu>
			</SidebarFooter>
		</Sidebar>
	);
}
