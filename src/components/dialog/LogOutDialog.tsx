import { useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { useAuthSignOutMutation } from "#/hooks/mutation/use-auth-mutation";
import { Button } from "../ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

export function LogOutDialog() {
	const navigate = useNavigate();
	const { mutate, isSuccess, data } = useAuthSignOutMutation();
	if (isSuccess) {
		if (data.success) {
			toast.success(data.message);
			navigate({ to: "/sign-in", search: { redirect: "/admin" } });
		} else toast.error(data.message);
	}

	return (
		<DialogContent>
			<DialogHeader>
				<DialogTitle>Bạn muốn đăng xuất?</DialogTitle>
				<DialogDescription>
					Hành động này sẽ thoát tài khoản. Để truy cập bạn sẽ cần đăng nhập
					lại.
				</DialogDescription>
			</DialogHeader>
			<DialogFooter>
				<DialogClose asChild>
					<Button variant={"ghost"}>Hủy bỏ</Button>
				</DialogClose>
				<DialogClose asChild>
					<Button variant={"destructive"} onClick={() => mutate()}>
						Xác nhận
					</Button>
				</DialogClose>
			</DialogFooter>
		</DialogContent>
	);
}
