import { SearchIcon } from "lucide-react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";

export function SearchCustomer() {
	return (
		<InputGroup className="w-full max-w-lg">
			<InputGroupInput placeholder="Tìm kiếm khách hàng (Tên/Số điện thoại)..." />
			<InputGroupAddon>
				<SearchIcon />
			</InputGroupAddon>
		</InputGroup>
	);
}
