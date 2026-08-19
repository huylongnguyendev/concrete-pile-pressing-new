import { Link } from "@tanstack/react-router";
import { Edit2Icon, EllipsisVerticalIcon, Trash2Icon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import type { Customer } from "#/types/customer.type";

export function CustomerItem({ item }: { item: Customer }) {
	return (
		<div className="flex justify-between items-center">
			<Checkbox />
			<Link
				to="/admin/customers/$customerId"
				params={{ customerId: item.id }}
				className="flex gap-4 justify-between w-full px-4"
			>
				<p className="w-1/2">{item.fullName}</p>
				<p className="w-1/2">{item.phoneNumber}</p>
			</Link>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant={"ghost"} size={"icon"}>
						<EllipsisVerticalIcon />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent>
					<DropdownMenuItem asChild>
						<Link
							to="/admin/customers/$customerId/edit"
							params={{ customerId: item.id }}
						>
							<Edit2Icon />
							<span>Sửa thông tin</span>
						</Link>
					</DropdownMenuItem>
					<DropdownMenuItem variant="destructive">
						<Trash2Icon />
						<span>Xóa khách hàng</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}
