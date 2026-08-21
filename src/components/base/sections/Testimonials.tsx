import {
	ClockIcon,
	QuoteIcon,
	ShieldCheckIcon,
	StarIcon,
	ThumbsUpIcon,
} from "lucide-react";
import { Animate } from "../animation/Animate";
import { Section } from "./Section";

export function Testimonials() {
	const reviews = [
		{
			name: "Anh Hoàng Minh",
			role: "Chủ đầu tư biệt thự",
			location: "Biên Hòa, Đồng Nai",
			content:
				"Đội ngũ thi công ép tải rất chuyên nghiệp, máy móc hiện đại và chạy đúng tải trọng thiết kế. Kỹ sư giám sát kỹ càng từng mũi cọc, gia đình rất yên tâm khi làm móng nhà.",
			rating: 5,
		},
		{
			name: "Chị Thanh Hương",
			role: "Chủ nhà phố",
			location: "Long Thành, Đồng Nai",
			content:
				"Nhà ở trong hẻm nhỏ tưởng không ép cọc được hóa ra lại dùng phương án ép neo rất gọn gàng. Thi công nhanh chóng, đúng tiến độ cam kết và giá cả rất hợp lý.",
			rating: 5,
		},
		{
			name: "Anh Quốc Bảo",
			role: "Quản lý dự án xưởng",
			location: "Bà Rịa - Vũng Tàu",
			content:
				"Đơn vị làm việc uy tín, có đầy đủ giấy tờ kiểm định chất lượng cọc bê tông cốt thép. Hợp đồng rõ ràng, không phát sinh chi phí phụ trong suốt quá trình thi công.",
			rating: 5,
		},
	];

	const highlights = [
		{
			title: "Cam Kết Không Lún Nứt",
			description: "Đảm bảo kỹ thuật tuyệt đối cho kết cấu công trình.",
			icon: ShieldCheckIcon,
		},
		{
			title: "Đúng Tiến Độ Thi Công",
			description: "Bàn giao mặt bằng nhanh chóng theo đúng thỏa thuận.",
			icon: ClockIcon,
		},
		{
			title: "Giá Trọn Gói Cạnh Tranh",
			description: "Minh bạch chi phí từ đầu, không phát sinh phụ phí.",
			icon: ThumbsUpIcon,
		},
	];

	return (
		<Section className="bg-gray-50/50 dark:bg-zinc-900/50">
			<div className="py-6 lg:py-12">
				{/* Phần Cam Kết Vàng */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
					{highlights.map((item, index) => {
						const Icon = item.icon;
						return (
							<Animate
								key={item.title}
								initial={{ opacity: 0, transform: "translateY(20px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								transition={{ delay: 0.1 * index }}
								className="bg-white dark:bg-zinc-900 p-6 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4"
							>
								<div className="p-3 bg-primary/10 text-primary rounded-xl shrink-0">
									<Icon className="w-6 h-6" />
								</div>
								<div>
									<h3 className="font-bold text-foreground text-base">
										{item.title}
									</h3>
									<p className="text-xs sm:text-sm text-gray-600 mt-0.5">
										{item.description}
									</p>
								</div>
							</Animate>
						);
					})}
				</div>

				{/* Header Đánh Giá */}
				<div className="text-center max-w-2xl mx-auto mb-12">
					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
					>
						<span>Đánh Giá Khách Hàng</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.2 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
							Khách Hàng Nói Gì Về Dịch Vụ Của Chúng Tôi?
						</h2>
					</Animate>
				</div>

				{/* Grid Đánh Giá */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
					{reviews.map((review, index) => (
						<Animate
							key={review.name}
							initial={{ opacity: 0, transform: "translateY(20px)" }}
							animate={{ opacity: 1, transform: "translateY(0px)" }}
							transition={{ delay: 0.2 * index }}
							className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 flex flex-col justify-between relative"
						>
							<div>
								<div className="flex items-center gap-1 text-amber-500 mb-4">
									{[...Array(review.rating)].map((_, i) => {
                    const key = `testimonial-${i}`
										return (
											<StarIcon key={key} className="w-4 h-4 fill-current" />
										);
									})}
								</div>

								<p className="text-sm sm:text-base text-gray-600 italic font-medium leading-relaxed relative z-10">
									&ldquo;{review.content}&rdquo;
								</p>
							</div>

							<div className="mt-6 pt-6 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
								<div>
									<h3 className="font-bold text-foreground text-base">
										{review.name}
									</h3>
									<p className="text-xs text-primary font-medium">
										{review.role}
									</p>
									<p className="text-xs text-gray-400 mt-0.5">
										{review.location}
									</p>
								</div>
								<QuoteIcon className="w-8 h-8 text-primary/10 shrink-0" />
							</div>
						</Animate>
					))}
				</div>
			</div>
		</Section>
	);
}
