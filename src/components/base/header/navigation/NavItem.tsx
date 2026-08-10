import { Link } from "@tanstack/react-router";
import type { NavItem as Nav } from "#/data/nav.data";

export function NavItem({
	item,
	onCloseMenu,
}: {
	item: Nav;
	onCloseMenu: () => void;
}) {
	return (
		<Link
			to={item.href}
			title={item.title}
			className="flex justify-center items-center py-4 hover:text-primary transition-colors duration-300 relative group"
			activeProps={{ className: "text-primary [&_div]:w-full" }}
			onClick={onCloseMenu}
		>
			{item.label}
			<div className="absolute w-0 h-1 bg-primary bottom-0 group-hover:w-full transition-all duration-300" />
		</Link>
	);
}
