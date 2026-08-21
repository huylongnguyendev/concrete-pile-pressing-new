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
			// Dùng py-3 trên mobile để bấm dễ hơn, lg:py-0 để cân đối trong thanh nav ngang
			className="group relative flex items-center py-3 text-sm font-medium transition-colors hover:text-primary lg:py-2"
			activeProps={{
				className: "text-primary font-semibold [&_.nav-indicator]:w-full",
			}}
			onClick={onCloseMenu}
		>
			<span>{item.label}</span>

			{/* Thanh gạch chân hiện đại (chỉ hiển thị đẹp trên desktop, trên mobile có thể tuỳ biến hoặc ẩn đi) */}
			<span className="nav-indicator absolute bottom-0 left-0 h-0.5 w-0 bg-primary transition-all duration-300 ease-out group-hover:w-full max-lg:hidden" />
		</Link>
	);
}