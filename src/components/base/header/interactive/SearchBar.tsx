import { useAppStore } from "@lavaz/store";
import { SearchIcon, XIcon } from "lucide-react";
import { useRef, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { useClickOutside } from "#/hooks/use-click-outside";
import { cn } from "#/lib/utils";
import { store } from "#/store/store";

export function SearchBar() {
	const [value, setValue] = useState<string>("");
	const [isOpenSearch, { setCloseSearch }] = useAppStore(
		store.toggle,
		(s) => s.search,
	);
	const ref = useRef<HTMLDivElement>(null);

	useClickOutside(ref, isOpenSearch, setCloseSearch);

	return (
		<div
			ref={ref}
			className={cn(
				"w-full px-4 absolute bottom-[100%+4px] -right-full py-4 bg-background shadow-sm overflow-hidden",
				isOpenSearch && "right-0",
			)}
		>
			<InputGroup>
				<InputGroupInput
					type="search"
					placeholder="Tìm kiếm..."
					value={value}
					onChange={(e) => setValue(e.target.value)}
				/>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"ghost"}
							size={"icon-sm"}
							className="text-destructive hover:text-destructive"
							onClick={setCloseSearch}
						>
							<XIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent>Đóng</TooltipContent>
				</Tooltip>
			</InputGroup>
		</div>
	);
}
