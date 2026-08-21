import { Logo } from "../Logo";
import { MenuToggle } from "./actions/MenuToggle";
import { Interactive } from "./interactive/Interactive";
import { NavList } from "./navigation/NavList";

export function HeaderBot() {
	return (
		<header className="sticky top-0 z-45 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 transition-all">
			<div className="box flex h-20 items-center justify-between gap-4 max-lg:h-16">
				{/* Mobile Menu Trigger & Logo */}
				<div className="flex items-center gap-3 lg:hidden">
					<MenuToggle />
				</div>

				<div className="max-lg:absolute max-lg:left-1/2 max-lg:-translate-x-1/2">
					<Logo />
				</div>

				{/* Navigation List (Desktop & Mobile Drawer) */}
				<NavList />

				{/* Interactive Actions (Search, Cart, User, etc.) */}
				<Interactive />
			</div>
		</header>
	);
}