import { PlusIcon } from "lucide-react";
import type React from "react";
import { Button } from "#/components/ui/button";
import { Field, FieldLabel } from "#/components/ui/field";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";

export function ContactInputForm({
	label,
	children,
	onAddValue,
	canAdd,
}: {
	label: string;
	children: React.ReactNode;
	onAddValue: () => void;
	canAdd: boolean;
}) {
	return (
		<Field>
			<div className="flex justify-between items-center gap-2">
				<FieldLabel>{label}</FieldLabel>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							size={"icon"}
							onClick={onAddValue}
							disabled={canAdd}
						>
							<PlusIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Thêm liên hệ mới</TooltipContent>
				</Tooltip>
			</div>
			{children}
		</Field>
	);
}
