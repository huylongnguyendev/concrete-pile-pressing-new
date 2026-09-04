import {
	ClientOnly,
	createFileRoute,
	isRedirect,
	Outlet,
	redirect,
} from "@tanstack/react-router";
import { AppSidebar } from "#/components/base/sidebar/AppSidebar";
import { UISync } from "#/components/base/UISync";
import { Dialog } from "#/components/ui/dialog";
import { SidebarProvider, SidebarTrigger } from "#/components/ui/sidebar";
import { getUserByIdFn } from "#/db/user.service";
import { ThemeProvider } from "#/providers/ThemeProvider";

export const Route = createFileRoute("/admin")({
	staticData: {
		isShowNav: false,
	},
	component: RouteComponent,
	head: () => ({
		meta: [
			{
				name: "robots",
				content: "noindex, nofollow",
			},
		],
	}),
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
		<ThemeProvider>
			<ClientOnly fallback={null}>
				<UISync />
			</ClientOnly>
			<Dialog>
				<SidebarProvider>
					<AppSidebar userId={user.id} />
					<div className="px-4 w-full">
						<SidebarTrigger />
						<Outlet />
					</div>
				</SidebarProvider>
			</Dialog>
		</ThemeProvider>
	);
}
