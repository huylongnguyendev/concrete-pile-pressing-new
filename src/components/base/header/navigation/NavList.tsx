import { navList } from "#/data/nav.data";
import { useAppStore } from "@lavaz/store";
import { CloseMenu } from "../actions/CloseMenu";
import { NavItem } from "./NavItem";
import { store } from "#/store/store";
import { cn } from "#/lib/utils";
import { useClickOutside } from "#/hooks/useClickOutside";
import { useRef } from "react";

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
				"max-lg:absolute -top-250 left-0 z-999 max-lg:w-full max-lg:bg-background/80 backdrop-blur-2xl rounded-md max-lg:shadow-md max-lg:p-4 transition-all duration-300",
				isOpenMenu && "top-0",
			)}
		>
			<ul className="flex max-lg:flex-col items-center lg:gap-8 capitalize font-semibold text-muted-foreground">
				<li className="ms-auto lg:hidden">
					<CloseMenu />
				</li>
				{navList.map((nav) => (
					<li key={nav.value}>
						<NavItem item={nav} onCloseMenu={setCloseMenu} />
					</li>
				))}
			</ul>
		</nav>
	);
}
