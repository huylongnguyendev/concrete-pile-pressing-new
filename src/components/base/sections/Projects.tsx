import { CheckCircle2Icon, MapPinIcon, PhoneCallIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Animate } from "../animation/Animate";
import { Section } from "./Section";

export function Projects() {
	// Danh sách dự án đã được chọn lọc và chuẩn hóa câu chữ sắc bén hơn
	const projectList = [
		{
			title: "Ép Cọc Tải Sắt Nhà Phố",
			location: "Thành phố Biên Hòa, Đồng Nai",
			specs: "Tải trọng 60 - 80 tấn • Cọc 250x250mm",
			image: "/ep-coc-nha-dan-bien-hoa.jpg",
		},
		{
			title: "Ép Cọc Tải Thép Nhà Phố",
			location: "Huyện Long Thành, Đồng Nai",
			specs: "Thiết bị chuyên dụng • Phù hợp hẻm hẹp < 2m",
			image: "/ep-coc-nha-dan-long-thanh.jpg",
		},
		{
			title: "Ép Móng Nhà Xưởng Công Nghiệp",
			location: "KCN Biên Hòa, Đồng Nai",
			specs: "Ép tải trọng lớn • Tiến độ nhanh chóng",
			image: "/ep-coc-nha-xuong-vung-tau.jpg",
		},
		{
			title: "Ép Cọc Nhà Xưởng",
			location: "Thành phố Hồ Chí Minh",
			specs: "Đảm bảo kỹ thuật • Không lún nứt",
			image: "/ep-coc-nha-xuong-dong-nai.jpg",
		},
		{
			title: "Ép Cọc Nhà Dân Dụng",
			location: "Tỉnh Bình Dương",
			specs: "Thi công nhanh gọn • Chi phí tối ưu",
			image: "/ep-coc-hem-nho-can-tho.jpg",
		},
		{
			title: "Ép Tải Công Trình Nhà Cao Tầng44",
			location: "Thành phố Vũng Tàu, BR-VT",
			specs: "Khảo sát & ép thử tải chuẩn xác",
			image: "/ep-coc-nha-dan-hcm.jpg",
		},
	];

	return (
		<Section>
			<div className="py-6 lg:py-12">
				{/* Header Section */}
				<div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
					<div className="max-w-xl">
						<Animate
							initial={{ opacity: 0, transform: "translateY(-10px)" }}
							animate={{ opacity: 1, transform: "translateY(0)" }}
							className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
						>
							<span>Dự Án Tiêu Biểu</span>
						</Animate>

						<Animate
							initial={{ opacity: 0, transform: "translateY(-10px)" }}
							animate={{ opacity: 1, transform: "translateY(0)" }}
							transition={{ delay: 0.2 }}
						>
							<h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-foreground">
								Công Trình Ép Cọc Thực Tế Tại Miền Nam
							</h2>
						</Animate>
					</div>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.4 }}
					>
						<Button asChild className="w-full md:w-auto">
							<a href="tel:09xxxxxxx">
								<PhoneCallIcon className="w-4 h-4 mr-2" />
								<span>Nhận Tư Vấn Miễn Phí</span>
							</a>
						</Button>
					</Animate>
				</div>

				{/* Grid Dự Án */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
					{projectList.map((project, index) => (
						<Animate
							key={project.title}
							initial={{ opacity: 0, transform: "translateY(20px)" }}
							animate={{ opacity: 1, transform: "translateY(0px)" }}
							transition={{ delay: 0.2 * index }}
							className="group bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-gray-100 dark:border-zinc-800 transition-all duration-300 flex flex-col"
						>
							<div className="aspect-video w-full overflow-hidden relative">
								<img
									src={project.image}
									alt={project.title}
									className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
									loading="lazy"
									width="400"
									height="225"
								/>
								<div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
									<CheckCircle2Icon className="w-3.5 h-3.5" />
									<span>Đã Hoàn Thành</span>
								</div>
							</div>

							<div className="p-6 flex flex-col grow justify-between">
								<div>
									<div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-2">
										<MapPinIcon className="w-4 h-4 shrink-0" />
										<span>{project.location}</span>
									</div>

									<h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
										{project.title}
									</h3>
								</div>

								<div className="mt-4 pt-4 border-t border-gray-100 dark:border-zinc-800 flex items-center justify-between">
									<span className="text-xs sm:text-sm font-medium text-gray-600 dark:text-gray-400">
										{project.specs}
									</span>
								</div>
							</div>
						</Animate>
					))}
				</div>
			</div>
		</Section>
	);
}
