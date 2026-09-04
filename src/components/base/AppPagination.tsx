import {
	ChevronLeftIcon,
	ChevronRightIcon,
	MoreHorizontalIcon,
} from "lucide-react";
import { Button } from "../ui/button";
import {
	Pagination,
	PaginationContent,
	PaginationItem,
} from "../ui/pagination";

export function AppPagination({
	currentPage,
	onSelectPage,
	totalPages,
}: {
	currentPage: number;
	onSelectPage: (page: number) => void;
	totalPages: number;
}) {
	if (totalPages <= 1) return null;

	const getPageNumbers = () => {
		const pages: (number | string)[] = [];
		const delta = 1;

		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - delta && i <= currentPage + delta)
			) {
				pages.push(i);
			} else if (
				pages[pages.length - 1] !== "..." &&
				(i < currentPage - delta || i > currentPage + delta)
			) {
				pages.push("...");
			}
		}
		return pages;
	};

	return (
		<Pagination>
			<PaginationContent>
				<PaginationItem>
					<Button
						variant={"ghost"}
						size={"icon"}
						disabled={currentPage === 1}
						onClick={() => onSelectPage(currentPage - 1)}
					>
						<ChevronLeftIcon />
					</Button>
				</PaginationItem>

				{/* Danh sách các số trang */}
				{getPageNumbers().map((page, index) => {
					if (page === "...") {
						const key = `ellipsis-${index}`;
						return (
							<PaginationItem key={key}>
								<div className="flex h-9 w-9 items-center justify-center text-muted-foreground">
									<MoreHorizontalIcon className="h-4 w-4" />
								</div>
							</PaginationItem>
						);
					}

					const pageNum = page as number;
					const isSelected = currentPage === pageNum;

					return (
						<PaginationItem key={pageNum}>
							<Button
								variant={isSelected ? "default" : "ghost"}
								size="icon"
								onClick={() => onSelectPage(pageNum)}
								className={`h-9 w-9 text-sm font-semibold transition-all ${
									isSelected
										? "shadow-sm shadow-primary/20"
										: "text-muted-foreground hover:text-foreground"
								}`}
							>
								{pageNum}
							</Button>
						</PaginationItem>
					);
				})}

				<PaginationItem>
					<Button
						variant={"ghost"}
						size={"icon"}
						disabled={currentPage === totalPages}
						onClick={() => onSelectPage(currentPage + 1)}
					>
						<ChevronRightIcon />
					</Button>
				</PaginationItem>
			</PaginationContent>
		</Pagination>
	);
}
