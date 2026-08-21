interface ContactSelect {
	label: string;
	value: string;
}

const locationSelect: ContactSelect[] = [
	{
		label: "TP. Biên Hòa, Đồng Nai",
		value: "bien-hoa",
	},
	{
		label: "Huyện Long Thành, Đồng Nai",
		value: "long-thanh",
	},
	{
		label: "Huyện Nhơn Trạch, Đồng Nai",
		value: "nhon-trach",
	},
	{
		label: "TP. Vũng Tàu, BR-VT",
		value: "vung-tau",
	},
	{
		label: "TP. Bà Rịa, BR-VT",
		value: "ba-ria",
	},
	{
		label: "Thị xã Phú Mỹ, BR-VT",
		value: "phu-my",
	},
	{
		label: "Khu vực khác miền Nam",
		value: "khac",
	},
];

const methodSelect: ContactSelect[] = [
	{
		label: "Ép cọc tải sắt (Công trình lớn)",
		value: "ep-tai",
	},
	{
		label: "Ép cọc neo (Nhà dân, hẻm nhỏ)",
		value: "ep-neo",
	},
	{
		label: "Cung cấp cọc BTCT cốt thép",
		value: "cung-cap-coc",
	},
	{
		label: "Tư vấn chung / Khảo sát địa chất",
		value: "tu-van-chung",
	},
];

export { locationSelect, methodSelect };
