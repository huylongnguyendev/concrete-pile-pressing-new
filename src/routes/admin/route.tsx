import { createFileRoute, Outlet } from "@tanstack/react-router";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { AppSidebar } from "#/providers/AppSidebar";

export const Route = createFileRoute("/admin")({
	staticData: { isShowNav: false },
	ssr: "data-only",
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<SidebarProvider>
			<AppSidebar />
			<div className="px-4 w-full">
				<SidebarTrigger variant={"outline"} className="mt-2" />
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
