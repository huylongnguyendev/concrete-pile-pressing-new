import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div className="space-y-8">Hello "/admin/settings"!</div>;
}
