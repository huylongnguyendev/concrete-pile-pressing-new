import { useAppStore } from "@lavaz/store";
import { useRef } from "react";
import { navList } from "#/data/nav.data";
import { useClickOutside } from "#/hooks/use-click-outside";
import { cn } from "#/lib/utils";
import { store } from "#/store/store";
import { CloseMenu } from "../actions/CloseMenu";
import { NavItem } from "./NavItem";

export function NavList() {
	const [isOpenMenu, { setCloseMenu }] = useAppStore(
		store.toggle,
		(s) => s.menu,
	);

	const ref = useRef<HTMLElement>(null);

	useClickOutside(ref, isOpenMenu, setCloseMenu);

	return (
		<nav
			ref={ref}
			className={cn(
				// Mobile drawer styling
				"max-lg:fixed max-lg:inset-x-0 max-lg:top-0 max-lg:z-50 max-lg:bg-background/95 max-lg:backdrop-blur-xl max-lg:p-6 max-lg:shadow-2xl max-lg:border-b max-lg:border-border",
				// Transition animation for mobile
				"max-lg:transition-transform max-lg:duration-300 max-lg:ease-in-out",
				isOpenMenu ? "max-lg:translate-y-0" : "max-lg:-translate-y-100",
				// Desktop styling
				"lg:flex lg:items-center",
			)}
		>
			<ul className="flex max-lg:flex-col lg:items-center lg:gap-8 capitalize font-medium text-muted-foreground">
				{/* Nút đóng menu trên mobile */}
				<li className="flex items-center justify-between pb-4 mb-2 border-b border-border lg:hidden">
					<span className="text-sm font-semibold text-foreground">Menu</span>
					<CloseMenu />
				</li>

				{navList.map((nav) => (
					<li
						key={nav.value}
						className="transition-colors hover:text-foreground"
					>
						<NavItem item={nav} onCloseMenu={setCloseMenu} />
					</li>
				))}
			</ul>
		</nav>
	);
}