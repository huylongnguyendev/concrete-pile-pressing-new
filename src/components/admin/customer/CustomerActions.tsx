import { Trash2Icon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import { Field, FieldGroup, FieldLabel } from "#/components/ui/field";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";

export function CustomerActions() {
	return (
		<div className="flex items-center justify-between">
			<FieldGroup className="mx-auto">
				<Field orientation="horizontal">
					<Checkbox id="select-all" name="select-all" />
					<FieldLabel htmlFor="select-all">Chọn tất cả</FieldLabel>
				</Field>
			</FieldGroup>
			<div className="flex items-center gap-2">
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>Sắp xếp</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuItem>Mới nhất</DropdownMenuItem>
						<DropdownMenuItem>Cũ nhất</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant={"destructive"} size={"icon"}>
							<Trash2Icon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Xóa khách hàng</TooltipContent>
				</Tooltip>
			</div>
		</div>
	);
}
