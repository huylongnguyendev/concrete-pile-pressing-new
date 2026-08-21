import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
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
import { Skeleton } from "#/components/ui/skeleton";
import { userQuery } from "#/db/query/user.query";
import { cn } from "#/lib/utils";

export function UserSidebar({ open }: { open: boolean }) {
	const { data, isPending } = useSuspenseQuery(userQuery);

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
									{data.success ? (
										<img
											src="https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=1xx5hf8t"
											alt="avatar"
											className="size-5 rounded-full"
										/>
									) : (
										<User2Icon className="w-5 h-5" />
									)}
									<div className="text-left leading-tight space-y-1">
										<p className="font-medium">
											{isPending ? (
												<Skeleton className="w-full h-4" />
											) : (
												data?.user?.fullName
											)}
										</p>
										<p className="font-semibold text-xs text-muted-foreground">
											{isPending ? (
												<Skeleton className="w-full h-4" />
											) : (
												data?.user?.role
											)}
										</p>
									</div>
								</div>
								<ChevronRightIcon className="w-4 h-4 text-muted-foreground" />
							</>
						) : data.success ? (
							<img
								src="https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=1xx5hf8t"
								alt="avatar"
								className="size-full absolute rounded-full"
							/>
						) : (
							<User2Icon className="w-5 h-5" />
						)}
					</SidebarMenuButton>
				</DropdownMenuTrigger>
				<DropdownMenuContent side="right" align="end" className="w-48">
					<DropdownMenuItem asChild>
						<Link
							to="/admin/$userId/setting"
							params={{ userId: data.user?.id || "" }}
						>
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
