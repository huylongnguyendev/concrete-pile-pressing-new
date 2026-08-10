import { Logo } from "../Logo";
import { MenuToggle } from "./actions/MenuToggle";
import { Interactive } from "./interactive/Interactive";
import { NavList } from "./navigation/NavList";

export function HeaderBot() {
	return (
		<div className="relative box flex justify-between items-center max-lg:py-4">
			<MenuToggle />
			<Logo />
			<NavList />
			<Interactive />
		</div>
	);
}
