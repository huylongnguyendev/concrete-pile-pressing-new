import { useAppStore } from "@lavaz/store";
import { SearchIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { store } from "#/store/store";

export function SearchToggle() {
	const [, { setOpenSearch }] = useAppStore(store.toggle, (s) => s.search);

	return (
		<Button variant={"outline"} size={"icon"} onClick={setOpenSearch}>
			<SearchIcon />
		</Button>
	);
}
