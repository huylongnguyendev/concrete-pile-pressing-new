import { TanStackDevtools } from "@tanstack/react-devtools";
import { FormDevtoolsPanel } from "@tanstack/react-form-devtools";
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
import { AppProvider } from "#/providers/AppProvider";
import appCss from "../styles.css?url";
import { companyQuery } from "#/db/query/company.query";

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
				property: "og:locale",
				content: "vi_VN",
			},
			{
				property: "og:type",
				content: "website",
			},
			{
				property: "og:site_name",
				content: "Ép Cọc Bê Tông Hùng Dũng",
			},
			{
				property: "og:title",
				content: "Ép Cọc Bê Tông Hùng Dũng - Uy Tín & Chuyên Nghiệp Miền Nam",
			},
			{
				property: "og:description",
				content:
					"Chuyên cung cấp dịch vụ ép cọc bê tông trọn gói tại Đồng Nai, TP.HCM, Bình Dương, Long An và Vũng Tàu.",
			},
			{
				property: "og:image",
				content: "http://localhost:3001/og-image.png", // Dùng URL tuyệt đối để devtool hiện ảnh preview
			},
			{
				property: "og:url",
				content: "http://localhost:3001/",
			},
			// --- CÁC THẺ CHO TWITTER / X ---
			{
				name: "twitter:card",
				content: "summary_large_image",
			},
			{
				name: "twitter:title",
				content: "Ép Cọc Bê Tông Hùng Dũng - Uy Tín & Chuyên Nghiệp Miền Nam",
			},
			{
				name: "twitter:description",
				content:
					"Chuyên cung cấp dịch vụ ép cọc bê tông trọn gói tại Đồng Nai, TP.HCM, Bình Dương, Long An và Vũng Tàu.",
			},
			{
				name: "twitter:image",
				content: "http://localhost:3001/og-image.png",
			},
			{
				name: "twitter:url",
				content: "http://localhost:3001/",
			},
		],
		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "apple-touch-icon",
				sizes: "180x180",
				href: "/apple-touch-icon.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "32x32",
				href: "/favicon-32x32.png",
			},
			{
				rel: "icon",
				type: "image/png",
				sizes: "16x16",
				href: "/favicon-16x16.png",
			},
			{
				rel: "manifest",
				href: "/site.webmanifest",
			},
			{
				rel: "icon",
				href: "/favicon.ico",
			},
		],
		scripts: [
			{
				type: "application/ld+json",
				children: JSON.stringify({
					"@context": "https://schema.org",
					"@type": "Organization",
					name: "Ép Cọc Bê Tông Hùng Dũng",
					url: "https://epcochungdung.vn",
					logo: "https://epcochungdung.vn/logo.png",
					contactPoint: {
						"@type": "ContactPoint",
						telephone: "0967386080",
						contactType: "customer service",
						areaServed: [
							{
								"@type": "AdministrativeArea",
								name: "Đồng Nai",
							},
							{
								"@type": "AdministrativeArea",
								name: "Bà Rịa - Vũng Tàu",
							},
							{
								"@type": "AdministrativeArea",
								name: "Thành phố Hồ Chí Minh",
							},
							{
								"@type": "AdministrativeArea",
								name: "Bình Dương",
							},
							{
								"@type": "AdministrativeArea",
								name: "Long An",
							},
						],
						availableLanguage: "Vietnamese",
					},
				}),
			},
		],
	}),
	loader: async ({ context }) => await context.queryClient.prefetchQuery(companyQuery),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	const matches = useMatches();
	const isShowNav = !matches.some((m) => m.staticData?.isShowNav === false);

	return (
		<html lang="vi" suppressHydrationWarning>
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
						{
							name: "Tanstack Form",
							render: <FormDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}