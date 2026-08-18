import { createFileRoute, Link } from "@tanstack/react-router";
import {
	EllipsisVerticalIcon,
	LogOutIcon,
	Repeat2Icon,
	ShieldEllipsisIcon,
} from "lucide-react";
import { SignOut } from "#/components/dialog/SignOut";
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
import { UserInfo } from "#/components/admin/user/UserInfo";
import { Suspense } from "react";

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
				<Suspense>
					<UserInfo />
				</Suspense>
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
						<DialogTrigger asChild>
							<Button variant={"destructive"}>
								<LogOutIcon />
								<span>Đăng xuất</span>
							</Button>
						</DialogTrigger>
						<SignOut />
					</CardAction>
				</CardFooter>
			</Card>
		</div>
	);
}
