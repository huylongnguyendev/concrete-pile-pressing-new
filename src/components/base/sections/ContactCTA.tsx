import { CheckCircle2Icon, MapPinIcon, PhoneCallIcon } from "lucide-react";
import { ContactBtn } from "#/components/ContactBtn";
import { Animate } from "../animation/Animate";
import { Section } from "./Section";

export function ContactCTA() {
	const serviceAreas = [
		"TP. Biên Hòa, Đồng Nai",
		"Huyện Nhơn Trạch, Đồng Nai",
		"Huyện Long Thành, Đồng Nai",
		"TP. Vũng Tàu, BR - Vũng Tàu",
		"TP. Bà Rịa, BR - Vũng Tàu",
		"Thị xã Phú Mỹ, BR - Vũng Tàu",
	];

	return (
		<Section className="relative overflow-hidden">
			<div className="py-8 lg:py-16">
				{/* Khung bọc CTA nổi bật */}
				<div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
						{/* Cột Nội Dung & Thông Điệp */}
						<div>
							<Animate
								initial={{ opacity: 0, transform: "translateY(-10px)" }}
								animate={{ opacity: 1, transform: "translateY(0)" }}
								className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
							>
								<PhoneCallIcon className="w-4 h-4 shrink-0" />
								<span>Hỗ Trợ Nhanh 24/7</span>
							</Animate>

							<Animate
								initial={{ opacity: 0, transform: "translateY(-10px)" }}
								animate={{ opacity: 1, transform: "translateY(0)" }}
								transition={{ delay: 0.2 }}
							>
								<h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground leading-tight">
									Cần Tư Vấn & Báo Giá Ép Cọc Cho Công Trình Của Bạn?
								</h2>
							</Animate>

							<Animate
								initial={{ opacity: 0, transform: "translateY(-10px)" }}
								animate={{ opacity: 1, transform: "translateY(0)" }}
								transition={{ delay: 0.4 }}
							>
								<p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
									Đội ngũ kỹ sư của chúng tôi luôn sẵn sàng khảo sát mặt bằng
									tận nơi hoàn toàn miễn phí tại Đồng Nai và Bà Rịa - Vũng Tàu.
								</p>
							</Animate>

							{/* Danh sách khu vực phục vụ */}
							<Animate
								initial={{ opacity: 0, transform: "translateY(10px)" }}
								animate={{ opacity: 1, transform: "translateY(0)" }}
								transition={{ delay: 0.6 }}
								className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3"
							>
								{serviceAreas.map((area) => (
									<div
										key={area}
										className="flex items-center gap-2 text-xs sm:text-sm text-gray-700 font-medium"
									>
										<CheckCircle2Icon className="w-4 h-4 text-primary shrink-0" />
										<span>{area}</span>
									</div>
								))}
							</Animate>
						</div>

						{/* Cột Nút Hành Động & Thẻ Thông Tin Nhanh */}
						<Animate
							initial={{ opacity: 0, transform: "scale(0.95)" }}
							animate={{ opacity: 1, transform: "scale(1)" }}
							transition={{ delay: 0.3 }}
							className="bg-white dark:bg-zinc-900 p-6 sm:p-8 rounded-2xl shadow-xl border border-gray-100 flex flex-col gap-6"
						>
							<div>
								<h3 className="text-xl font-bold text-foreground">
									Liên Hệ Trực Tiếp
								</h3>
								<p className="text-xs sm:text-sm text-gray-500 mt-1">
									Gọi điện ngay để nhận báo giá chi tiết theo mét cọc hoặc trọn
									gói công trình.
								</p>
							</div>

							{/* Nút Gọi Ngay (CTA chính) */}
							<ContactBtn />

							{/* Địa chỉ cơ sở */}
							<div className="pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-start gap-3">
								<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
									<MapPinIcon className="w-5 h-5" />
								</div>
								<div>
									<h4 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
										Văn Phòng / Xưởng Sản Xuất
									</h4>
									<p className="text-sm font-semibold text-foreground mt-0.5">
										Khu vực Biên Hòa, Đồng Nai & Các vùng lân cận Miền Nam
									</p>
								</div>
							</div>
						</Animate>
					</div>

					{/* Hiệu ứng nền trang trí góc */}
					<div className="absolute -top-12 -right-12 bg-primary/10 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
					<div className="absolute -bottom-12 -left-12 bg-primary/10 w-64 h-64 rounded-full blur-3xl pointer-events-none" />
				</div>
			</div>
		</Section>
	);
}
