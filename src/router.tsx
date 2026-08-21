import { QueryClient } from "@tanstack/react-query";
import {
	createRouter as createTanStackRouter,
	Link,
} from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { WrenchIcon } from "lucide-react";
import { Button } from "./components/ui/button";
import { routeTree } from "./routeTree.gen";

export function getRouter() {
	const queryClient = new QueryClient();
	const router = createTanStackRouter({
		routeTree,
		context: { queryClient },
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		defaultPendingComponent: () => (
			<div className="text-center flex flex-col items-center justify-center max-w-md mx-auto space-y-6 h-dvh!">
				{/* Hiệu ứng máy móc đang hoạt động */}
				<div className="relative w-20 h-20 mx-auto flex items-center justify-center">
					<div className="absolute inset-0 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
					<div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center">
						<WrenchIcon className="w-5 h-5 animate-pulse" />
					</div>
				</div>

				<div className="space-y-2">
					<h2 className="text-2xl font-bold tracking-tight text-foreground">
						Đang Tiến Hành Ép Tải Dữ Liệu...
					</h2>
					<p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 font-medium">
						Đội ngũ kỹ thuật đang đồng bộ thông số móng và bản vẽ. Vui lòng đợi
						trong giây lát!
					</p>
				</div>

				{/* Thanh tiến trình giả lập lực ép */}
				<div className="w-48 h-2 mx-auto bg-gray-100 dark:bg-zinc-800 rounded-full overflow-hidden">
					<div className="w-full h-full bg-primary animate-[pulse_1s_infinite] rounded-full" />
				</div>
			</div>
		),
		defaultErrorComponent: () => (
			<div className="flex-1 flex flex-col items-center justify-center py-20 px-4 text-center">
				<h1 className="text-6xl font-bold text-primary mb-4">404</h1>
				<h2 className="text-2xl font-semibold mb-2">Không tìm thấy trang</h2>
				<p className="text-muted-foreground mb-6 max-w-md">
					Xin lỗi, trang bạn đang truy cập không tồn tại hoặc đã bị di chuyển.
				</p>
				<Button asChild>
					<Link to="/">Quay về trang chủ</Link>
				</Button>
			</div>
		),
		defaultNotFoundComponent: () => (
			<div className="w-full flex flex-col justify-center items-center place-items-center h-dvh!">
				<div className="relative mb-6">
					<span className="text-8xl md:text-9xl font-extrabold text-primary/10 select-none">
						404
					</span>
					<div className="absolute inset-0 flex items-center justify-center">
						<h1 className="text-3xl md:text-4xl font-bold tracking-tight">
							Oops! Không tìm thấy trang
						</h1>
					</div>
				</div>

				{/* Mô tả thân thiện */}
				<p className="text-muted-foreground max-w-md mb-8 md:text-lg text-center">
					Trang bạn đang tìm kiếm có thể đã bị xóa, đổi tên, hoặc tạm thời không
					truy cập được.
				</p>

				{/* Nút hành động quay về trang chủ */}
				<div className="flex items-center gap-4">
					<Button size={"lg"} asChild>
						<Link to="/">Quay về trang chủ</Link>
					</Button>

					<Button
						variant={"outline"}
						size={"lg"}
						onClick={() => window.history.back()}
					>
						Trang trước đó
					</Button>
				</div>
			</div>
		),
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient,
		dehydrateOptions: {
			shouldDehydrateQuery: (query) => query.meta?.ssr !== false,
		},
		hydrateOptions: {
			defaultOptions: {
				queries: {
					gcTime: 60 * 1000,
				},
			},
		},
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
