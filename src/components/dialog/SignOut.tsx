import { useAuthSignOut } from "#/hooks/query/use-auth-query";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

export function SignOut() {
	const { mutate } = useAuthSignOut();
	const navigate = useNavigate();

	const handleSignOut = async () => {
		await mutate();
		navigate({ to: "/admin/sign-in" });
	};

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Đăng xuất</DialogTitle>
				<DialogDescription>Bạn có chắc chắn muốn đăng xuất?</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant={"destructive"}>Hủy bỏ</Button>
				</DialogClose>
				<Button variant={"ghost"} onClick={handleSignOut}>
					Xác nhận
				</Button>
			</DialogFooter>
		</DialogContent>
	);
}
