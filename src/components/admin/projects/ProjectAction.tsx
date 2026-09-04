import { Link } from "@tanstack/react-router";
import { PlusIcon, SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "#/components/ui/button";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { useDebounce } from "#/hooks/use-debounce";

export function ProjectAction({
	value,
	items,
	onSearchChange,
}: {
	value: string;
	items: number;
	onSearchChange: (value: string) => void;
}) {
	const [search, setSearch] = useState<string>("");
	const { debounced } = useDebounce(search);


	useEffect(() => {
		onSearchChange(debounced);
	}, [debounced, onSearchChange]);

	return (
		<div className="flex justify-between items-center max-sm:flex-col gap-4 max-sm:items-end max-sm:sticky top-0 z-1000">
			<InputGroup className="w-full max-w-md">
				<InputGroupInput
					placeholder="Tìm kiếm dự án..."
					value={search}
					onChange={(e) => setSearch(e.target.value)}
				/>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					{value !== "" ? `${items} kết quả` : ""}
				</InputGroupAddon>
			</InputGroup>
			<Button asChild>
				<Link to="/admin/projects/new">
					<PlusIcon />
					<span>Thêm dự án</span>
				</Link>
			</Button>
		</div>
	);
}
