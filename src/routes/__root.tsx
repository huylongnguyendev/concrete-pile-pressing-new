import { TanStackDevtools } from "@tanstack/react-devtools";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtoolsPanel } from "@tanstack/react-query-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
	useMatches,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { Toaster } from "sonner";
import { Footer } from "#/components/base/footer/Footer";
import { Header } from "#/components/base/header/Header";
import { getCompanyFn } from "#/db/services/company.service";
import { AppProvider } from "#/providers/AppProvider";
import appCss from "../styles.css?url";
import { PageLoading } from "#/components/pending/client/PageLoading";

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
	loader: ({ context }) =>
		context.queryClient.prefetchQuery({
			queryKey: ["company"],
			queryFn: () => getCompanyFn(),
			staleTime: 60 * 1000 * 5,
		}),
	shellComponent: RootDocument,
	pendingComponent: () => <PageLoading />,
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
						{
							name: "Tanstack Query",
							render: <ReactQueryDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
