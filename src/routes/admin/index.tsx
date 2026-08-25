import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
	// staticData: { isShowNav: false, isShowSidebar: false },
	component: RouteComponent,
	
});

function RouteComponent() {
	return <div></div>;
}
