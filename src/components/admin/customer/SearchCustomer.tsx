import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { useDebounce } from "#/hooks/use-debounce";

export function SearchCustomer({
	onSearch,
}: {
	onSearch: (value: string) => void;
}) {
	const [value, setValue] = useState<string>("");
	const { debounced } = useDebounce(value, 150);

	useEffect(() => {
		onSearch(debounced ?? "");
	}, [debounced, onSearch]);

	return (
		<InputGroup className="w-full max-w-lg">
			<InputGroupInput
				value={value}
				onChange={(e) => setValue(e.target.value)}
				placeholder="Tìm kiếm khách hàng (Tên/Số điện thoại)..."
			/>
			<InputGroupAddon>
				<SearchIcon />
			</InputGroupAddon>
		</InputGroup>
	);
}
