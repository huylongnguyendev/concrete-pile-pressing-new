import { ChevronLeftIcon } from "lucide-react";
import { Button } from "../ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

export function BackBtn() {
	return (
		<Tooltip>
			<TooltipTrigger asChild>
				<Button
					variant={"ghost"}
					size={"icon"}
					type="button"
					onClick={() => window.history.back()}
				>
					<ChevronLeftIcon />
				</Button>
			</TooltipTrigger>
			<TooltipContent>Quay lại</TooltipContent>
		</Tooltip>
	);
}
