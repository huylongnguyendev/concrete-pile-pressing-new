interface NavItem {
	value: string;
	label: string;
	href: string;
	title: string;
}

const navList: NavItem[] = [
	{
		value: "home-nav",
		label: "trang chủ",
		href: "/",
		title:
			"ép cọc bê tông hùng dũng - đơn vị ép cọc bê tông uy tín tại Đồng Nai và Bà Rịa - Vũng Tàu",
	},
	{
		value: "service-price-nav",
		label: "bảng giá dịch vụ",
		href: "/bang-gia",
		title: "bảng giá dịch vụ ép cọc của bê tông Hùng Dũng",
	},
	{
		value: "contact-nav",
		label: "liên hệ",
		href: "/lien-he",
		title: "liên hệ tư vấn miễn phí",
	},
];

export { navList, type NavItem };
