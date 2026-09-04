import { createFileRoute } from "@tanstack/react-router";
import { PlusIcon, SearchIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";

export const Route = createFileRoute("/admin/posts/")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="py-2 space-y-4">
			<h1 className="font-semibold border-l-4 border-primary pl-2">
				<p className="text-xl">Quản lý bài viết</p>
				<p className="text-muted-foreground text-sm">
					Quản lý các bài viết của bạn
				</p>
			</h1>
			<div className="flex justify-between items-center gap-2">
				<InputGroup className="w-full max-w-md">
					<InputGroupInput placeholder="Tìm kiếm bài viết..." />
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">12 kết quả</InputGroupAddon>
				</InputGroup>
				<Button className="">
					<PlusIcon />
					<span>Tạo bài viết mới</span>
				</Button>
			</div>
		</div>
	);
}
