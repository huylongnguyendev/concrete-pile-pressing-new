import {
	createFileRoute,
	isRedirect,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { AppSidebar } from "#/components/base/sidebar/AppSidebar";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { getUserByIdFn } from "#/db/user.service";

export const Route = createFileRoute("/admin")({
	staticData: {
		isShowNav: false,
	},
	component: RouteComponent,
	beforeLoad: async ({ location }) => {
		try {
			const res = await getUserByIdFn();
			if (!res.success || !res.user)
				throw redirect({
					to: "/sign-in",
					search: { redirect: location.href },
				});

			return { user: res.user };
		} catch (error) {
			if (isRedirect(error)) throw error;

			throw redirect({
				to: "/sign-in",
				search: { redirect: location.href },
			});
		}
	},
});

function RouteComponent() {
	const { user } = Route.useRouteContext();
	return (
		<SidebarProvider>
			<AppSidebar userId={user.id} />
			<div className="px-4 w-full">
				<SidebarTrigger />
				<Outlet />
			</div>
		</SidebarProvider>
	);
}
