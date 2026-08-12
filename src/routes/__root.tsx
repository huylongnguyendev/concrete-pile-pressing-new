import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Footer } from "#/components/base/footer/Footer";
import { Header } from "#/components/base/header/Header";
import { getCompanyFn } from "#/lib/db/services/company.service";
import { AppProvider } from "#/providers/AppProvider";
import appCss from "../styles.css?url";
import { Toaster } from "sonner";

interface RootRouteContext {
	queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<RootRouteContext>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "Ép cọc bê tông Hùng Dũng",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
		],
	}),
	loader: async () => await getCompanyFn(),
	staleTime: Infinity,
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const matches = useMatches();
	const isShowNav = !matches.some((m) => m.staticData?.isShowNav === false);
	return (
		<html lang="en" suppressHydrationWarning>
			<head>
				<HeadContent />
			</head>
			<body>
				<AppProvider>
					{isShowNav && <Header />}
					{children}
					{isShowNav && <Footer />}
					<Toaster closeButton richColors />
				</AppProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}


