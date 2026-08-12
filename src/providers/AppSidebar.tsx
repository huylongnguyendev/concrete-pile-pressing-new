import { Link } from "@tanstack/react-router";
import {
	ChevronRightIcon,
	LogOutIcon,
	SettingsIcon,
	User2Icon,
	UserCog2Icon,
} from "lucide-react";
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
	SidebarHeader,
	SidebarMenu,
	SidebarMenuButton,
	SidebarMenuItem,
	useSidebar,
} from "#/components/ui/sidebar";
import { cn } from "#/lib/utils";

export function AppSidebar() {
	const { open } = useSidebar();

	return (
		<Sidebar collapsible="icon">
			<SidebarHeader>
				<div>logo</div>
			</SidebarHeader>
			<SidebarContent></SidebarContent>
			<SidebarFooter>
				<SidebarMenu>
					<SidebarMenuItem>
						<SidebarMenuButton asChild>
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
										"justify-between h-10",
										open || "bg-emerald-50 text-emerald-600 rounded-full",
									)}
								>
									{open ? (
										<>
											<div className="flex items-center justify-center gap-1">
												<User2Icon />

												<div className="">
													<p>Username</p>
													<p className="font-semibold text-xs">role</p>
												</div>
											</div>
											<ChevronRightIcon />
										</>
									) : (
										<User2Icon />
									)}
								</SidebarMenuButton>
							</DropdownMenuTrigger>
							<DropdownMenuContent>
								<DropdownMenuItem>
									<UserCog2Icon />
									<span>Cài đặt tài khoản</span>
								</DropdownMenuItem>
								<DropdownMenuItem variant="destructive">
									<LogOutIcon />
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
