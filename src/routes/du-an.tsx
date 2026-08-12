import { createFileRoute } from "@tanstack/react-router";
import {
	Building2Icon,
	CheckCircle2Icon,
	FilterIcon,
	MapPinIcon,
} from "lucide-react";
import { useState } from "react";
import { Animate } from "#/components/base/animation/Animate";
import { Section } from "#/components/base/sections/Section";
import { ContactBtn } from "#/components/ContactBtn";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
} from "#/components/ui/card";

export const Route = createFileRoute("/du-an")({
	component: RouteComponent,
});

function RouteComponent() {
	const [filter, setFilter] = useState("all");

	const allProjects = [
		{
			id: 1,
			title: "Thi Công Ép Cọc Biệt Thự Phố",
			location: "Thành phố Biên Hòa, Đồng Nai",
			category: "dong-nai",
			specs: "Ép cọc tải sắt - Cọc 250x250mm",
			scale: "Trọng tải 60 tấn",
			image: "/images/du-an-bien-hoa.jpg",
		},
		{
			id: 2,
			title: "Ép Cọc Nhà Dân 3 Tầng",
			location: "Huyện Long Thành, Đồng Nai",
			category: "dong-nai",
			specs: "Ép cọc neo - Phù hợp hẻm nhỏ",
			scale: "Trọng tải 40 tấn",
			image: "/images/du-an-long-thanh.jpg",
		},
		{
			id: 3,
			title: "Công Trình Nhà Xưởng Công Nghiệp",
			location: "Thành phố Vũng Tàu, BR-VT",
			category: "vung-tau",
			specs: "Ép tải trọng lớn - Cọc 300x300mm",
			scale: "Trọng tải 90 tấn",
			image: "/images/du-an-vung-tau.jpg",
		},
		{
			id: 4,
			title: "Ép Móng Nhà Phố Liền Kề",
			location: "Huyện Nhơn Trạch, Đồng Nai",
			category: "dong-nai",
			specs: "Ép cọc tải sắt",
			scale: "Trọng tải 50 tấn",
			image: "/images/du-an-nhon-trach.jpg",
		},
		{
			id: 5,
			title: "Thi Công Móng Khách Sạn Mini",
			location: "Thành phố Bà Rịa, BR-VT",
			category: "vung-tau",
			specs: "Ép cọc bê tông cốt thép",
			scale: "Trọng tải 70 tấn",
			image: "/images/du-an-ba-ria.jpg",
		},
		{
			id: 6,
			title: "Ép Cọc Nhà Dân 2 Tầng",
			location: "Thị xã Phú Mỹ, BR-VT",
			category: "vung-tau",
			specs: "Ép cọc neo chuyên dụng",
			scale: "Trọng tải 35 tấn",
			image: "/images/du-an-phu-my.jpg",
		},
	];

	const filteredProjects =
		filter === "all"
			? allProjects
			: allProjects.filter((p) => p.category === filter);

	return (
		<div className="min-h-screen flex flex-col">
			{/* Hero Header của trang Dự án */}
			<Section className="bg-gray-50/50 dark:bg-zinc-900/50 pt-12 pb-8 lg:py-16">
				<div className="text-center max-w-3xl mx-auto">
					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
					>
						<Building2Icon className="w-4 h-4 shrink-0" />
						<span>Hồ Sơ Năng Lực</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.2 }}
					>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
							Toàn Bộ Công Trình Đã Thi Công
						</h1>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.4 }}
					>
						<p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
							Khám phá các công trình nhà ở, biệt thự, nhà xưởng thực tế mà
							chúng tôi đã hoàn thành ép cọc thành công tại Đồng Nai và Bà Rịa -
							Vũng Tàu.
						</p>
					</Animate>

					{/* Bộ lọc khu vực */}
					<Animate
						initial={{ opacity: 0, transform: "translateY(10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.6 }}
						className="mt-8 flex flex-wrap items-center justify-center gap-2"
					>
						<Button
							variant={filter === "all" ? "default" : "outline"}
							onClick={() => setFilter("all")}
							className="rounded-full text-xs sm:text-sm"
						>
							<FilterIcon className="w-3.5 h-3.5 mr-1.5" />
							Tất Cả Công Trình
						</Button>
						<Button
							variant={filter === "dong-nai" ? "default" : "outline"}
							onClick={() => setFilter("dong-nai")}
							className="rounded-full text-xs sm:text-sm"
						>
							Đồng Nai (Biên Hòa, Long Thành...)
						</Button>
						<Button
							variant={filter === "vung-tau" ? "default" : "outline"}
							onClick={() => setFilter("vung-tau")}
							className="rounded-full text-xs sm:text-sm"
						>
							Bà Rịa - Vũng Tàu
						</Button>
					</Animate>
				</div>
			</Section>

			{/* Danh sách lưới dự án */}
			<Section>
				<div className="py-8 lg:py-12">
					<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{filteredProjects.map((project, index) => (
							<Animate
								key={project.id}
								initial={{ opacity: 0, transform: "translateY(20px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								transition={{ delay: 0.1 * index }}
								className="group"
							>
								<Card className="h-full group-hover:shadow-lg transition-shadow duration-300">
									<CardHeader className="aspect-video w-full overflow-hidden relative">
										<img
											src={project.image}
											alt={project.title}
											className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
											loading="lazy"
										/>
										<div className="absolute top-3 right-3 bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full shadow-md flex items-center gap-1">
											<CheckCircle2Icon className="w-3.5 h-3.5" />
											<span>Đã Hoàn Thành</span>
										</div>
									</CardHeader>

									<CardContent>
										<div className="flex items-center gap-1.5 text-xs text-primary font-medium mb-2">
											<MapPinIcon className="w-4 h-4 shrink-0" />
											<span>{project.location}</span>
										</div>

										<h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
											{project.title}
										</h3>

										<p className="mt-2 text-xs text-gray-500 font-medium">
											Quy mô:{" "}
											<span className="text-foreground">{project.scale}</span>
										</p>
									</CardContent>

									<CardFooter>
										<div className="pt-4 flex items-center justify-between text-xs sm:text-sm font-medium text-gray-600">
											<span>{project.specs}</span>
										</div>
									</CardFooter>
								</Card>
							</Animate>
						))}
					</div>

					{/* Trạng thái nếu không có kết quả */}
					{filteredProjects.length === 0 && (
						<div className="text-center py-12">
							<p className="text-gray-500">
								Đang cập nhật thêm công trình tại khu vực này...
							</p>
						</div>
					)}
				</div>
			</Section>

			{/* Banner kêu gọi hành động nhỏ ở chân trang dự án */}
			<Section className="bg-primary/5 dark:bg-primary/10 border-t border-primary/10">
				<div className="py-12 text-center max-w-2xl mx-auto space-y-4">
					<h2 className="text-2xl sm:text-3xl font-bold text-foreground">
						Bạn Cần Thi Công Móng Cho Công Trình Tương Tự?
					</h2>
					<p className="text-sm text-gray-600 font-medium">
						Liên hệ ngay với chúng tôi để nhận tư vấn phương án ép cọc và báo
						giá chính xác nhất tận nơi.
					</p>
					<div className="pt-2">
						<ContactBtn />
					</div>
				</div>
			</Section>
		</div>
	);
}
