import { eq, useLiveQuery } from "@tanstack/react-db";
import { createFileRoute, Outlet, useMatches } from "@tanstack/react-router";
import { useEffect } from "react";
import { Dialog } from "#/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { collections } from "#/lib/screen";
import { AppSidebar } from "#/providers/AppSidebar";
import { getCompanyFn } from "#/db/services/company.service";

export const Route = createFileRoute("/admin")({
	staticData: { isShowNav: false },
	ssr: "data-only",
	loader: ({ context }) =>
		context.queryClient.ensureQueryData({
			queryKey: ["company"],
			queryFn: () => getCompanyFn(),
		}),
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
					{isShowSidebar && (
						<SidebarTrigger variant={"outline"} className="mt-2" />
					)}
					<Outlet />
				</div>
			</SidebarProvider>
		</Dialog>
	);
}
