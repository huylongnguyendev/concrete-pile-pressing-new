import { useAppStore } from "@lavaz/store";
import { MenuIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { store } from "#/store/store";

export function MenuToggle() {
	const [, { setOpenMenu }] = useAppStore(store.toggle, (s) => s.menu);
	return (
		<Button
			variant={"outline"}
			size={"icon"}
			className="lg:hidden"
			onClick={setOpenMenu}
		>
			<MenuIcon />
		</Button>
	);
}
