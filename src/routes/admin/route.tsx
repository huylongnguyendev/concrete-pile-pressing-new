import { eq, useLiveQuery } from "@tanstack/react-db";
import {
	createFileRoute,
	Outlet,
	redirect,
	useMatches,
} from "@tanstack/react-router";
import { useEffect } from "react";
import { AppSidebar } from "#/components/base/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { companyQuery } from "#/db/query/company.query";
import { userQuery } from "#/db/query/user.query";
import { collections } from "#/lib/screen";

export const Route = createFileRoute("/admin")({
	staticData: { isShowNav: false },
	loader: async ({ context }) => {
		try {
			await Promise.all([
				context.queryClient.ensureQueryData(companyQuery),
				context.queryClient.ensureQueryData(userQuery),
			]);
		} catch (error) {
			throw redirect({ to: "/admin/sign-in" });
		}
	},
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
		<SidebarProvider>
			{isShowSidebar && <AppSidebar />}
			<div className="px-4 w-full">
				<div className="flex items-center justify-between border-b pb-2 sticky top-0 z-9999 bg-background">
					{isShowSidebar && (
						<SidebarTrigger variant={"outline"} className="mt-2" />
					)}
				</div>
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
