import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { customerQueryById } from "#/db/query/customer.query";
import { createFileRoute } from "@tanstack/react-router";
import { ChevronLeftIcon } from "lucide-react";

export const Route = createFileRoute("/admin/customers/$customerId/")({
	component: RouteComponent,
	loader: ({ context, params }) =>
		context.queryClient.prefetchQuery(customerQueryById(params.customerId)),
});

function RouteComponent() {
	return (
		<div className="py-4 space-y-8">
			<div>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button variant={"ghost"} size={"icon"}>
							<ChevronLeftIcon />
						</Button>
					</TooltipTrigger>
					<TooltipContent className="z-10000">Quay lại</TooltipContent>
				</Tooltip>
				<DropdownMenu>
					<DropdownMenuTrigger asChild>
						<Button variant={"outline"}>Xem khách khác</Button>
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuLabel className="font-semibold text-xs text-muted-foreground">
							Danh sách khách hàng
						</DropdownMenuLabel>
						<DropdownMenuSeparator />
						<DropdownMenuItem>ABC</DropdownMenuItem>
					</DropdownMenuContent>
				</DropdownMenu>
			</div>
			<div></div>
		</div>
	);
}
