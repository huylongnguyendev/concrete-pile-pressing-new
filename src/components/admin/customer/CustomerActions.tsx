import { useAppStore } from "@lavaz/store";
import { Trash2Icon } from "lucide-react";
import { useState } from "react";
import { ConfirmPassword } from "#/components/dialog/ConfirmPassword";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Dialog, DialogTrigger } from "#/components/ui/dialog";
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
import { useDeleteCustomer } from "#/hooks/query/use-customer-query";
import { store } from "#/store/store";

export function CustomerActions({
	onSort,
	currentSelect,
}: {
	currentSelect: "asc" | "desc";
	onSort: (value: "asc" | "desc") => void;
}) {
	const [{ isSelectAll, ids }, { setIsSelectAll, setSelectAll }] = useAppStore(
		store.selectAll,
		(s) => s,
	);
	const [select, setSelect] = useState<"asc" | "desc">("desc");
	const { mutate } = useDeleteCustomer();

	const handleSelect = (value: "asc" | "desc") => {
		if (currentSelect === value) return;
		setSelect(value);
		onSort(value);
	};

	const handleRemoveSelectAll = (check: boolean) => {
		if (!check) setSelectAll([]);
		setIsSelectAll(check);
	};

	return (
		<Dialog>
			<div className="flex items-center justify-between">
				<FieldGroup className="mx-auto">
					<Field orientation="horizontal">
						<Checkbox
							id="select-all"
							name="select-all"
							checked={isSelectAll}
							onCheckedChange={(checked) =>
								handleRemoveSelectAll(Boolean(checked))
							}
						/>
						<FieldLabel htmlFor="select-all">Chọn tất cả</FieldLabel>
					</Field>
				</FieldGroup>
				<div className="flex items-center gap-2">
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button variant={"outline"}>
								{select === "desc" ? "Mới nhất" : "Cũ nhất"}
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent>
							<DropdownMenuItem onSelect={() => handleSelect("desc")}>
								Mới nhất
							</DropdownMenuItem>
							<DropdownMenuItem onSelect={() => handleSelect("asc")}>
								Cũ nhất
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>

					<Tooltip>
						<TooltipTrigger asChild>
							<DialogTrigger asChild>
								<Button
									variant={"destructive"}
									size={"icon"}
									disabled={ids.length === 0}
								>
									<Trash2Icon />
								</Button>
							</DialogTrigger>
						</TooltipTrigger>
						<TooltipContent>Xóa khách hàng</TooltipContent>
					</Tooltip>
				</div>
			</div>
			<ConfirmPassword />
		</Dialog>
	);
}
