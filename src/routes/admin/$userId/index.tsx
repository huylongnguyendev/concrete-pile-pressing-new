import { createFileRoute } from "@tanstack/react-router";
import { AccInfo } from "#/components/admin/account/AccInfo";
import { AccAuth } from "#/components/admin/account/AccAuth";
import { Dialog } from "#/components/ui/dialog";

export const Route = createFileRoute("/admin/$userId/")({
	component: RouteComponent,
});

function RouteComponent() {
	const { user } = Route.useRouteContext();
	return (
		<Dialog>
			<div className="py-4 space-y-8">
				<h1 className="border-l-4 border-primary pl-2 font-semibold">
					<p className="text-lg md:text-xl">Thiết lập tài khoản</p>
					<p className="text-muted-foreground text-xs">
						Thiết lập và bảo mật tài khoản của bạn
					</p>
				</h1>
				<AccInfo user={user} />
				<AccAuth />
			</div>
		</Dialog>
	);
}
