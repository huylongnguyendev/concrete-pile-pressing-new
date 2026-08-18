import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/$userId/edit")({
	component: RouteComponent,
});

function RouteComponent() {
	return <div className="">Hello "/admin/$userId/edit"!</div>;
}
