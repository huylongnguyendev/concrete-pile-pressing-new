import { useAppStore } from "@lavaz/store";
import { KeyRoundIcon, MinusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import { Input } from "#/components/ui/input";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { useDebounce } from "#/hooks/use-debounce";
import { store } from "#/store/store";
import type { ContactType } from "#/types/company.type";

export function ContactInputItem({
	value,
	index,
	isManyData,
	type,
	placeholder,
	id,
	priority,
}: {
	value: string;
	index: number;
	isManyData: boolean;
	type: ContactType;
	placeholder?: string;
	id: string;
	priority: boolean;
}) {
	const [, { setValue, setRemove, setPriority }] = useAppStore(
		store.companyInput,
		(s) => s[type],
	);
	const [currentValue, setCurrentValue] = useState<string>("");
	const { debounced } = useDebounce(currentValue);

	useEffect(() => {
		setValue({ id, type, value: debounced });
	}, [id, type, debounced, setValue]);

	useEffect(() => {
		setCurrentValue(value);
	}, [value]);

	return (
		<div className="flex items-center gap-2">
			<Input
				placeholder={placeholder}
				value={currentValue.replace("+84", "0")}
				onChange={(e) => setCurrentValue(e.target.value)}
			/>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant={"outline"}
						size={"icon"}
						disabled={(index === 0 && isManyData) || priority || !value}
						onClick={() => setPriority({ id, type })}
					>
						<KeyRoundIcon />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Đặt làm liên hệ chính</TooltipContent>
			</Tooltip>
			<Tooltip>
				<TooltipTrigger asChild>
					<Button
						type="button"
						variant={"outline"}
						size={"icon"}
						disabled={(index === 0 && isManyData) || priority}
						onClick={() => setRemove({ id, type })}
					>
						<MinusIcon />
					</Button>
				</TooltipTrigger>
				<TooltipContent>Xóa liên hệ này</TooltipContent>
			</Tooltip>
		</div>
	);
}
