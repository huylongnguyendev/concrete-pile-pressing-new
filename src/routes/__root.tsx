import { useAppStore } from "@lavaz/store";
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
import { useEffect } from "react";
import { Toaster } from "sonner";
import { Footer } from "#/components/base/footer/Footer";
import { Header } from "#/components/base/header/Header";
import { getCompanyFn } from "#/db/services/company.service";
import { AppProvider } from "#/providers/AppProvider";
import { store } from "#/store/store";
import appCss from "../styles.css?url";

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
	const { companies } = Route.useLoaderData();
	const matches = useMatches();
	const isShowNav = !matches.some((m) => m.staticData?.isShowNav === false);
	const [, { setInfo }] = useAppStore(store.company, (s) => s);

	useEffect(() => {
		const safeCompanies = Array.isArray(companies) ? companies : [];

		if (safeCompanies.length === 0)
			setInfo({
				id: "",
				phoneNumber: [{ id: "", number: "+84967386080" }],
				addresses: [{ id: "", address: "address" }],
				emails: [{ id: "", mail: "epcocbetonghungdung@gmail.com" }],
			});
		else {
			const phoneNumber = safeCompanies[0].phoneNumber;
			const addresses = safeCompanies[0].addresses;
			const emails = safeCompanies[0].emails;
			const id = safeCompanies[0].id;

			setInfo({ id, addresses, emails, phoneNumber });
		}
	}, [companies, setInfo]);

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
