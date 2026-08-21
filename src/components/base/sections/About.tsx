import { Link } from "@tanstack/react-router";
import {
	ArrowRightIcon,
	CheckCircle2Icon,
	PhoneCallIcon,
	ShieldCheckIcon,
	TargetIcon,
	UsersIcon,
} from "lucide-react";
import { Button } from "#/components/ui/button";
import { Animate } from "../animation/Animate";
import { Section } from "./Section";

export function About() {
	const coreValues = [
		{
			title: "Chất Lượng Hàng Đầu",
			description:
				"Sử dụng vật liệu bê tông cốt thép đạt chuẩn, kiểm định nghiêm ngặt trước khi thi công.",
			icon: ShieldCheckIcon,
		},
		{
			title: "Thi Công An Toàn",
			description:
				"Đội ngũ kỹ sư giàu kinh nghiệm, vận hành máy móc hiện đại, đảm bảo an toàn tuyệt đối.",
			icon: TargetIcon,
		},
		{
			title: "Đồng Hành Tin Cậy",
			description:
				"Cam kết tiến độ nhanh chóng, chi phí minh bạch và bảo hành kết cấu lâu dài.",
			icon: UsersIcon,
		},
	];

	return (
		<Section>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-6 lg:py-12">
				{/* Cột Hình Ảnh & Điểm Nhấn (Bên Trái) */}
				<Animate
					initial={{ opacity: 0, transform: "translateX(-20px)" }}
					animate={{ opacity: 1, transform: "translateX(0px)" }}
					transition={{ delay: 0.2 }}
					className="relative w-full"
				>
					<div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 aspect-video lg:aspect-4/3 w-full">
						<img
							src="/about-us-img.jpg"
							alt="Giới thiệu đơn vị ép cọc bê tông uy tín tại Đồng Nai và Bà Rịa Vũng Tàu"
							className="w-full h-full object-cover"
							loading="lazy"
							width={800}
							height={600}
						/>
					</div>

					{/* Badge nổi bật đè lên ảnh (Floating Card) */}
					<div className="absolute -bottom-6 -right-2 sm:right-6 bg-white dark:bg-zinc-900 p-4 sm:p-6 rounded-2xl shadow-xl border border-gray-100 max-w-xs">
						<div className="flex items-center gap-3">
							<div className="p-3 bg-primary/10 text-primary rounded-xl">
								<CheckCircle2Icon className="w-6 h-6" />
							</div>
							<div>
								<p className="text-2xl font-bold text-foreground">10+ Năm</p>
								<p className="text-xs sm:text-sm text-gray-600 font-medium">
									Kinh nghiệm nền móng
								</p>
							</div>
						</div>
					</div>

					{/* Hiệu ứng nền trang trí */}
					<div className="absolute -top-6 -left-6 bg-primary/10 w-48 h-48 lg:w-72 lg:h-72 rounded-full blur-3xl -z-10 hidden sm:block" />
				</Animate>

				{/* Cột Nội Dung (Bên Phải) */}
				<div className="text-center lg:text-left">
					{/* Badge Phụ */}
					<Animate
						initial={{ opacity: 0, transform: "translateX(20px)" }}
						animate={{ opacity: 1, transform: "translateX(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4 mx-auto lg:mx-0"
					>
						<ShieldCheckIcon className="w-4 h-4 shrink-0" />
						<span>Về Chúng Tôi</span>
					</Animate>

					{/* Tiêu đề chính */}
					<Animate
						initial={{ opacity: 0, transform: "translateX(20px)" }}
						animate={{ opacity: 1, transform: "translateX(0)" }}
						transition={{ delay: 0.4 }}
					>
						<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
							<span className="block text-foreground">
								Xây Nền Móng Vững Chãi Cho{" "}
								<span className="text-primary underline decoration-wavy decoration-primary/40 underline-offset-8">
									Mọi Công Trình
								</span>
							</span>
						</h2>
					</Animate>

					{/* Đoạn văn giới thiệu */}
					<Animate
						initial={{ opacity: 0, transform: "translateX(20px)" }}
						animate={{ opacity: 1, transform: "translateX(0)" }}
						transition={{ delay: 0.6 }}
					>
						<p className="mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl font-medium mx-auto lg:mx-0">
							Chúng tôi tự hào là đơn vị tiên phong cung cấp giải pháp{" "}
							<strong className="text-foreground font-semibold">
								ép cọc tải, ép cọc neo và sản xuất cọc bê tông cốt thép
							</strong>{" "}
							hàng đầu tại khu vực Đồng Nai và Bà Rịa - Vũng Tàu. Mỗi công trình
							đều được chúng tôi đặt tâm huyết vào từng mũi cọc, đảm bảo sự kiên
							cố theo năm tháng.
						</p>
					</Animate>

					{/* Danh sách giá trị cốt lõi / Điểm khác biệt */}
					<div className="mt-6 space-y-4 max-w-lg mx-auto lg:mx-0">
						{coreValues.map((item, index) => {
							const Icon = item.icon;
							return (
								<Animate
									key={item.title}
									initial={{ opacity: 0, transform: "translateY(20px)" }}
									animate={{ opacity: 1, transform: "translateY(0px)" }}
									transition={{ delay: 0.8 + index * 0.15 }}
									className="flex items-start gap-3 text-left"
								>
									<div className="p-2 bg-primary/10 text-primary rounded-lg shrink-0 mt-1">
										<Icon className="w-4 h-4" />
									</div>
									<div>
										<h3 className="font-semibold text-foreground text-sm sm:text-base">
											{item.title}
										</h3>
										<p className="text-xs sm:text-sm text-gray-600">
											{item.description}
										</p>
									</div>
								</Animate>
							);
						})}
					</div>

					{/* Nhóm Nút Hành Động (CTA) */}
					<Animate
						initial={{ opacity: 0, transform: "translateY(20px)" }}
						animate={{ opacity: 1, transform: "translateY(0px)" }}
						transition={{ delay: 1.4 }}
						className="mt-8 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
					>
						<Button
							asChild
							className="w-full sm:w-auto px-6 py-3 h-auto shadow-sm hover:shadow transition-all"
						>
							<Link to="/lien-he">
								<span>Khám Phá Dịch Vụ</span>
								<ArrowRightIcon className="w-5 h-5 ml-2 shrink-0" />
							</Link>
						</Button>

						<Button
							variant={"secondary"}
							asChild
							className="w-full sm:w-auto px-6 py-3 h-auto capitalize shadow-sm hover:shadow transition-all"
						>
							<a href="tel:0123456789">
								<PhoneCallIcon className="w-5 h-5 mr-2 shrink-0" />
								<span>Liên Hệ Trực Tiếp</span>
							</a>
						</Button>
					</Animate>
				</div>
			</div>
		</Section>
	);
}
