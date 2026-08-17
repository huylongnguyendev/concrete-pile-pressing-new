import { eq, useLiveQuery } from "@tanstack/react-db";
import {
	createFileRoute,
	Link,
	Outlet,
	useMatches,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { Dialog } from "#/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { companyQuery } from "#/db/query/company.query";
import { collections } from "#/lib/screen";
import { AppSidebar } from "#/components/base/sidebar/AppSidebar";
import { userQuery } from "#/db/query/user.query";
import { getUserFn } from "#/db/services/user.service";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { MessageCircleIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Badge } from "#/components/ui/badge";

export const Route = createFileRoute("/admin")({
	staticData: { isShowNav: false },
	ssr: "data-only",
	loader: async ({ context }) =>
		await Promise.allSettled([
			context.queryClient.ensureQueryData(companyQuery),
			// context.queryClient.ensureQueryData(userQuery),
		]),
	component: RouteComponent,
});

function RouteComponent() {
	const { data } = useLiveQuery((q) =>
		q.from({ pref: collections }).where(({ pref }) => eq(pref.id, "ui")),
	);

	const matches = useMatches();
	const isShowSidebar = !matches.some(
		(m) => m.staticData?.isShowSidebar === false,
	);

	const currentPref = data[0];

	const currentTheme = currentPref?.mode ?? "light";
	const currentFontSize = currentPref?.size;

	useEffect(() => {
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(currentTheme);

		if (!currentFontSize) return;

		document.documentElement.style.setProperty(
			"--base-font-size",
			`${currentFontSize}px`,
		);
	}, [currentTheme, currentFontSize]);

	return (
		<Dialog>
			<SidebarProvider>
				{isShowSidebar && <AppSidebar />}
				<div className="px-4 w-full">
					<div className="flex items-center justify-between border-b pb-2 sticky top-0 z-9999 bg-background">
						{isShowSidebar && (
							<SidebarTrigger variant={"outline"} className="mt-2" />
						)}
						<Tooltip>
							<TooltipTrigger asChild>
								<Button
									variant={"outline"}
									size={"icon-sm"}
									asChild
									className="relative size-7 mt-2"
								>
									<Link to="/admin/message">
										<MessageCircleIcon />
										<Badge
											className="absolute size-3 p-0 -top-1 -right-1"
											variant={"destructive"}
										>
											<span className="absolute size-3 bg-red-600 animate-ping" />
										</Badge>
									</Link>
								</Button>
							</TooltipTrigger>
							<TooltipContent>Xem tin nhắn</TooltipContent>
						</Tooltip>
					</div>
					<Outlet />
				</div>
			</SidebarProvider>
		</Dialog>
	);
}
