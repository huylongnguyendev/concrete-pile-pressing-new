import { EditIcon, LogOutIcon } from "lucide-react";
import { LogOutDialog } from "#/components/dialog/LogOutDialog";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { DialogTrigger } from "#/components/ui/dialog";

export function AccAuth() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hoạt động và Bảo mật</CardTitle>
				<CardDescription>
					Các hoạt động và bảo mật Tài khoản của bạn
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button variant={"ghost"} className="w-full justify-start">
					<EditIcon />
					<span>Thay đổi mật khẩu</span>
				</Button>
				<DialogTrigger asChild>
					<Button variant={"ghost"} className="w-full justify-start">
						<LogOutIcon />
						<span>Đăng xuất</span>
					</Button>
				</DialogTrigger>
				<LogOutDialog />
			</CardContent>
		</Card>
	);
}
