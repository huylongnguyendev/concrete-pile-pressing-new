import { Loader2Icon } from "lucide-react";

export function PageLoading() {
	return (
		<div className="flex-1 w-full min-h-[60vh] flex flex-col items-center justify-center bg-background">
			<div className="flex flex-col items-center gap-3 animate-pulse">
				{/* Icon xoay nhẹ nhàng hoặc logo của bạn */}
				<Loader2Icon className="w-8 h-8 text-primary animate-spin" />
				<p className="text-sm font-medium text-muted-foreground tracking-wide">
					Đang tải dữ liệu, vui lòng chờ...
				</p>
			</div>
		</div>
	);
}
