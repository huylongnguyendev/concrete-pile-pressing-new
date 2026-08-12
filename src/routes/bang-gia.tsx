import { createFileRoute } from "@tanstack/react-router";
import {
	FileTextIcon,
	HelpCircleIcon,
	LayersIcon,
	ShieldCheckIcon,
} from "lucide-react";
import { Animate } from "#/components/base/animation/Animate";
import { Section } from "#/components/base/sections/Section";
import { ContactBtn } from "#/components/ContactBtn";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "#/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "#/components/ui/tabs";

export const Route = createFileRoute("/bang-gia")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="pt-20 min-h-screen flex flex-col">
			{/* Hero Header của trang Bảng Giá */}
			<Section className="bg-gray-50/50 dark:bg-zinc-900/50 pt-12 pb-8 lg:py-16">
				<div className="text-center max-w-3xl mx-auto">
					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
					>
						<FileTextIcon className="w-4 h-4 shrink-0" />
						<span>Minh Bạch Chi Phí</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.2 }}
					>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
							Bảng Giá Ép Cọc Bê Tông & Cọc Thi Công
						</h1>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.4 }}
					>
						<p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
							Cung cấp báo giá chi tiết, trọn gói, cạnh tranh nhất tại khu vực
							Đồng Nai và Bà Rịa - Vũng Tàu. Cam kết không phát sinh phụ phí ẩn.
						</p>
					</Animate>
				</div>
			</Section>

			{/* Nội dung bảng giá chi tiết sử dụng Shadcn Tabs */}
			<Section>
				<div className="py-8 lg:py-12 max-w-4xl mx-auto">
					<Tabs defaultValue="neo" className="space-y-8">
						<Animate
							initial={{ opacity: 0, transform: "translateY(10px)" }}
							animate={{ opacity: 1, transform: "translateY(0px)" }}
							className="flex justify-center  h-10.5"
						>
							<TabsList className="rounded-full group-data-[orientation=horizontal]/tabs:h-10.5">
								<TabsTrigger
									value="neo"
									className="rounded-full py-2.5 px-6 text-xs sm:text-sm font-semibold"
								>
									Bảng Giá Ép Cọc Neo
								</TabsTrigger>
								<TabsTrigger
									value="coc"
									className="rounded-full py-2.5 px-6 text-xs sm:text-sm font-semibold"
								>
									Bảng Giá Cọc BTCT
								</TabsTrigger>
							</TabsList>
						</Animate>

						{/* TAB 1: ÉP CỌC NEO */}
						<TabsContent value="neo">
							<Animate
								initial={{ opacity: 0, transform: "translateY(10px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								className="space-y-6"
							>
								<Card className="border-border/60 shadow-sm overflow-hidden">
									<CardHeader className="flex flex-row items-center gap-4 bg-muted/40 pb-6">
										<div className="p-2.5 bg-primary/10 text-primary rounded-xl">
											<ShieldCheckIcon className="w-6 h-6" />
										</div>
										<div>
											<CardTitle className="text-xl">
												Bảng Giá Ép Cọc Bê Tông Neo
											</CardTitle>
											<CardDescription>
												Phù hợp cho công trình nhà dân, hẻm nhỏ tại Đồng Nai &
												Vũng Tàu
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent className="p-0">
										<Table>
											<TableHeader>
												<TableRow className="bg-muted/50">
													<TableHead className="py-4 px-6 font-semibold">
														Quy Mô Công Trình
													</TableHead>
													<TableHead className="py-4 px-6 font-semibold text-right">
														Đơn Giá Thi Công
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow>
													<TableCell className="py-4 px-6 font-medium text-foreground">
														Đối với những công trình có tổng khối lượng cọc bê
														tông{" "}
														<span className="text-primary font-bold">
															lớn hơn 300m
														</span>
													</TableCell>
													<TableCell className="py-4 px-6 text-right font-bold text-primary text-base">
														40.000đ/m
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell className="py-4 px-6 font-medium text-foreground">
														Đối với những công trình có tổng khối lượng cọc{" "}
														<span className="text-primary font-bold">
															nhỏ hơn 300m
														</span>
													</TableCell>
													<TableCell className="py-4 px-6 text-right font-bold text-primary text-base">
														8.000.000đ – 14.000.000đ{" "}
														<span className="block text-xs font-normal text-muted-foreground">
															(Trọn gói công trình)
														</span>
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</Animate>
						</TabsContent>

						{/* TAB 2: CỌC BÊ TÔNG CỐT THÉP */}
						<TabsContent value="coc">
							<Animate
								initial={{ opacity: 0, transform: "translateY(10px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								className="space-y-6"
							>
								<Card className="border-border/60 shadow-sm overflow-hidden">
									<CardHeader className="flex flex-row items-center gap-4 bg-muted/40 pb-6">
										<div className="p-2.5 bg-primary/10 text-primary rounded-xl">
											<LayersIcon className="w-6 h-6" />
										</div>
										<div>
											<CardTitle className="text-xl">
												Bảng Giá Cọc Bê Tông Cốt Thép
											</CardTitle>
											<CardDescription>
												Cọc đúc sẵn tại xưởng, đạt chuẩn kiểm định chất lượng
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent className="p-0">
										<Table>
											<TableHeader>
												<TableRow className="bg-muted/50">
													<TableHead className="py-4 px-6 font-semibold">
														Loại Thép
													</TableHead>
													<TableHead className="py-4 px-6 font-semibold">
														Cấp Phối Mác
													</TableHead>
													<TableHead className="py-4 px-6 font-semibold">
														Thiết Diện
													</TableHead>
													<TableHead className="py-4 px-6 font-semibold">
														Chiều Dài
													</TableHead>
													<TableHead className="py-4 px-6 font-semibold text-right">
														Đơn Giá
													</TableHead>
												</TableRow>
											</TableHeader>
											<TableBody>
												<TableRow>
													<TableCell className="py-4 px-6 font-bold text-foreground">
														Thép HVU
													</TableCell>
													<TableCell className="py-4 px-6 text-muted-foreground">
														C250
													</TableCell>
													<TableCell className="py-4 px-6 text-muted-foreground">
														250 x 250
													</TableCell>
													<TableCell className="py-4 px-6 text-muted-foreground">
														4m, 5m, 6m, 7m, 8m
													</TableCell>
													<TableCell className="py-4 px-6 text-right font-bold text-primary text-base">
														175.000đ/m
													</TableCell>
												</TableRow>
												<TableRow>
													<TableCell className="py-4 px-6 font-bold text-foreground">
														Thép Việt Nhật
													</TableCell>
													<TableCell className="py-4 px-6 text-muted-foreground">
														C250
													</TableCell>
													<TableCell className="py-4 px-6 text-muted-foreground">
														250 x 250
													</TableCell>
													<TableCell className="py-4 px-6 text-muted-foreground">
														4m, 5m, 6m, 7m, 8m
													</TableCell>
													<TableCell className="py-4 px-6 text-right font-bold text-primary text-base">
														200.000đ/m
													</TableCell>
												</TableRow>
											</TableBody>
										</Table>
									</CardContent>
								</Card>
							</Animate>
						</TabsContent>
					</Tabs>

					{/* Lưu ý báo giá */}
					<div className="mt-12 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-6 rounded-2xl flex items-start gap-4">
						<HelpCircleIcon className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
						<div className="space-y-1 text-xs sm:text-sm text-amber-900 dark:text-amber-200">
							<p className="font-bold">Lưu ý quan trọng:</p>
							<p>
								Đơn giá trên mang tính chất tham khảo chung cho các công trình
								tiêu chuẩn. Giá thực tế có thể thay đổi tùy thuộc vào vị trí mặt
								bằng thi công (trong hẻm nhỏ hay mặt tiền lớn), chiều dài cọc và
								số lượng thực tế. Vui lòng liên hệ trực tiếp để nhận báo giá chi
								tiết và chính xác nhất cho công trình của bạn.
							</p>
						</div>
					</div>

					{/* Khung CTA Gọi Ngay */}
					<div className="text-center pt-8 space-y-4">
						<h3 className="text-xl font-bold text-foreground">
							Bạn cần tư vấn chi phí chi tiết cho công trình của mình?
						</h3>
						<div>
							<ContactBtn />
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
}
