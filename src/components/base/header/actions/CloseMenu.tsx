import { useAppStore } from "@lavaz/store";
import { XIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { store } from "#/store/store";

export function CloseMenu() {
	const [, { setCloseMenu }] = useAppStore(store.toggle, (s) => s.menu);
	return (
		<Button
			variant={"ghost"}
			size={"icon-sm"}
			className="text-destructive hover:text-destructive"
			onClick={setCloseMenu}
		>
			<XIcon />
		</Button>
	);
}
