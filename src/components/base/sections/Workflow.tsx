import {
	ClipboardCheckIcon,
	HardHatIcon,
	RulerIcon,
	ShieldCheckIcon,
	TruckIcon,
} from "lucide-react";
import { Animate } from "../animation/Animate";
import { Section } from "./Section";

export function Workflow() {
	const steps = [
		{
			step: "01",
			title: "Khảo Sát & Tư Vấn Địa Chất",
			description:
				"Đến trực tiếp công trình tại Đồng Nai hoặc Vũng Tàu để khảo sát mặt bằng, kiểm tra địa chất và tư vấn phương án ép tải hay ép neo tối ưu nhất.",
			icon: RulerIcon,
		},
		{
			step: "02",
			title: "Báo Giá & Ký Hợp Đồng",
			description:
				"Lên dự toán chi phí trọn gói minh bạch, rõ ràng theo mét cọc thực tế hoặc trọn gói, cam kết không phát sinh chi phí ngoài ý muốn.",
			icon: ClipboardCheckIcon,
		},
		{
			step: "03",
			title: "Vận Chuyển Máy Móc & Cọc",
			description:
				"Tập kết dàn máy ép cọc chuyên dụng cùng hệ thống cọc bê tông cốt thép đạt chuẩn chất lượng đến chân công trình đúng hẹn.",
			icon: TruckIcon,
		},
		{
			step: "04",
			title: "Thi Công Ép Cọc & Giám Sát",
			description:
				"Tiến hành ép cọc theo đúng bản thiết kế kỹ thuật, kiểm tra lực ép đồng hồ liên tục, đảm bảo độ sâu và độ chịu tải chuẩn xác.",
			icon: HardHatIcon,
		},
		{
			step: "05",
			title: "Nghiệm Thu & Bàn Giao",
			description:
				"Kiểm tra cao độ, độ thẳng đứng của cọc, lập biên bản nghiệm thu kỹ thuật công trình và bàn giao mặt bằng cho chủ đầu tư.",
			icon: ShieldCheckIcon,
		},
	];

	return (
		<Section className="bg-gray-50/50 dark:bg-zinc-900/50">
			<div className="py-6 lg:py-12">
				{/* Header Section */}
				<div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
					>
						<span>Quy Trình Làm Việc</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.2 }}
					>
						<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
							Quy Trình Thi Công Ép Cọc Bê Tông Chuyên Nghiệp
						</h2>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.4 }}
					>
						<p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
							Các bước làm việc rõ ràng, khoa học nhằm đảm bảo tiến độ nhanh
							chóng và an toàn tuyệt đối cho mọi công trình.
						</p>
					</Animate>
				</div>

				{/* Danh sách các bước (Grid / Timeline card) */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{steps.map((item, index) => {
						const Icon = item.icon;
						return (
							<Animate
								key={item.step}
								initial={{ opacity: 0, transform: "translateY(20px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								transition={{ delay: 0.15 * index }}
								className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-sm hover:shadow-xl border border-gray-100 transition-all duration-300 flex flex-col justify-between relative group overflow-hidden"
							>
								{/* Số thứ tự nền mờ trang trí */}
								<span className="absolute top-4 right-4 text-5xl font-extrabold text-gray-100 dark:text-zinc-800/50 select-none group-hover:text-primary/10 transition-colors">
									{item.step}
								</span>

								<div>
									<div className="p-3 bg-primary/10 text-primary rounded-xl w-fit mb-6">
										<Icon className="w-6 h-6" />
									</div>

									<h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
										{item.title}
									</h3>

									<p className="mt-3 text-sm text-gray-600 leading-relaxed font-medium">
										{item.description}
									</p>
								</div>
							</Animate>
						);
					})}
				</div>
			</div>
		</Section>
	);
}
