import { Button } from "../ui/button";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "../ui/dialog";

export function Logout() {
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
				<Button variant={"ghost"}>Xác nhận</Button>
			</DialogFooter>
		</DialogContent>
	);
}
