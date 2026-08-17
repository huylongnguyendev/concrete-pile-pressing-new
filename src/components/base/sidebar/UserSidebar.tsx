import {
	ChevronRightIcon,
	LogOutIcon,
	User2Icon,
	UserCog2Icon,
} from "lucide-react";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { SidebarMenuButton, SidebarMenuItem } from "#/components/ui/sidebar";
import { cn } from "#/lib/utils";
import { useSuspenseQuery } from "@tanstack/react-query";
import { userQuery } from "#/db/query/user.query";
import { Link } from "@tanstack/react-router";

export function UserSidebar({ open }: { open: boolean }) {
	// const { data } = useSuspenseQuery(userQuery);

	return (
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
					<DropdownMenuItem asChild>
						<Link to="/admin/$userId/setting" params={{ userId: "1" }}>
							<UserCog2Icon className="mr-2 w-4 h-4" />
							<span>Cài đặt tài khoản</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem variant="destructive">
						<LogOutIcon className="mr-2 w-4 h-4" />
						<span>Đăng xuất</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</SidebarMenuItem>
	);
}
