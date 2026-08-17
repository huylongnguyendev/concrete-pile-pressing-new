import { createFileRoute, Link } from "@tanstack/react-router";
import {
	EllipsisVerticalIcon,
	LogOutIcon,
	Repeat2Icon,
	ShieldEllipsisIcon,
} from "lucide-react";
import { Logout } from "#/components/dialog/Logout";
import { Avatar, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { DialogTrigger } from "#/components/ui/dialog";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";

export const Route = createFileRoute("/admin/$userId/setting")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-4 space-y-8">
			<Card>
				<CardHeader>
					<CardTitle>Thông tin cá nhân</CardTitle>
					<CardDescription>
						Xem thông tin cá nhân của bạn hoặc thay đổi thông tin
					</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<div className="flex justify-between">
						<div className="flex items-center gap-4">
							<Avatar size="lg">
								<AvatarImage
									src="https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=Felix"
									alt="avatar"
								/>
							</Avatar>
							<div className="font-semibold">
								<h2 className="text-lg">name</h2>
								<p className="text-sm text-muted-foreground">@username</p>
							</div>
						</div>
						<Button variant={"outline"} asChild className="max-md:hidden">
							<Link to="/">Sửa thông tin</Link>
						</Button>
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={"outline"}
									size={"icon"}
									asChild
									className="md:hidden"
								>
									<Link to="/">
										<EllipsisVerticalIcon />
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Sửa thông tin</TooltipContent>
						</Tooltip>
					</div>
					<div className="space-y-2">
						<p>Số điện thoại:</p>
						<p>Email:</p>
					</div>
				</CardContent>
			</Card>
			<Card>
				<CardHeader>
					<CardTitle>Quyền riêng tư</CardTitle>
					<CardDescription>
						Thay đổi quyền riêng tư, mật khẩu của bạn
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Link
						to="/admin/$userId/change-password"
						params={{ userId: "1" }}
						className="flex items-center gap-2 rounded-md p-2 hover:bg-secondary transition-colors duration-300"
					>
						<Repeat2Icon />
						<span>Thay đổi mật khẩu</span>
					</Link>
					<Link
						to="/admin/private-policy"
						className="flex items-center gap-2 rounded-md p-2 hover:bg-secondary transition-colors duration-300"
					>
						<ShieldEllipsisIcon />
						<span>Chính sách bảo mật</span>
					</Link>
				</CardContent>
				<CardFooter>
					<CardAction className="w-full justify-end flex">
						<DialogTrigger>
							<Button variant={"destructive"}>
								<LogOutIcon />
								<span>Đăng xuất</span>
							</Button>
						</DialogTrigger>
						<Logout />
					</CardAction>
				</CardFooter>
			</Card>
		</div>
	);
}
