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
		<div className="pt-16 sm:pt-20 min-h-screen flex flex-col">
			{/* Hero Header */}
			<Section className="bg-gray-50/50 dark:bg-zinc-900/50 py-10 sm:py-16 px-4">
				<div className="text-center max-w-3xl mx-auto">
					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
					>
						<FileTextIcon className="w-4 h-4 shrink-0" />
						<span>Minh Bạch Chi Phí</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.2 }}
					>
						<h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
							Bảng Giá Ép Cọc Bê Tông & Cọc Thi Công
						</h1>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.4 }}
					>
						<p className="mt-4 text-xs sm:text-base text-gray-600 dark:text-gray-300 font-medium">
							Cung cấp báo giá chi tiết, trọn gói, cạnh tranh nhất tại khu vực
							Đồng Nai và Bà Rịa - Vũng Tàu. Cam kết không phát sinh phụ phí ẩn.
						</p>
					</Animate>
				</div>
			</Section>

			{/* Nội dung bảng giá chi tiết */}
			<Section className="px-3 sm:px-6">
				<div className="py-8 lg:py-12 max-w-4xl mx-auto">
					<Tabs defaultValue="neo" className="space-y-8">
						<Animate
							initial={{ opacity: 0, transform: "translateY(10px)" }}
							animate={{ opacity: 1, transform: "translateY(0px)" }}
							className="flex justify-center"
						>
							<TabsList className="rounded-full h-auto p-1 w-full sm:w-auto grid grid-cols-2 max-w-xs sm:max-w-none">
								<TabsTrigger
									value="neo"
									className="rounded-full py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold"
								>
									Bảng Giá Ép Cọc Neo
								</TabsTrigger>
								<TabsTrigger
									value="coc"
									className="rounded-full py-2 px-4 sm:px-6 text-xs sm:text-sm font-semibold"
								>
									Bảng Giá Cọc BTCT
								</TabsTrigger>
							</TabsList>
						</Animate>

						{/* TAB 1: ÉP CỌC NEO (Mobile dùng dạng Card, Desktop dùng Table) */}
						<TabsContent value="neo">
							<Animate
								initial={{ opacity: 0, transform: "translateY(10px)" }}
								animate={{ opacity: 1, transform: "translateY(0px)" }}
								className="space-y-6"
							>
								<Card className="border-border/60 shadow-sm overflow-hidden">
									<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-muted/40 p-4 sm:p-6">
										<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
											<ShieldCheckIcon className="w-6 h-6" />
										</div>
										<div>
											<CardTitle className="text-lg sm:text-xl">
												Bảng Giá Ép Cọc Bê Tông Neo
											</CardTitle>
											<CardDescription className="text-xs sm:text-sm">
												Phù hợp cho công trình nhà dân, hẻm nhỏ tại Đồng Nai &
												Vũng Tàu
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent className="p-4 sm:p-0">
										{/* GIAO DIỆN MOBILE: Dạng Thẻ Xếp Dọc */}
										<div className="grid grid-cols-1 gap-3 sm:hidden">
											<div className="bg-muted/30 border border-border/60 rounded-xl p-4 space-y-2">
												<span className="block text-xs font-medium text-muted-foreground">
													Khối lượng cọc bê tông:{" "}
													<strong className="text-primary">Lớn hơn 300m</strong>
												</span>
												<div className="flex justify-between items-center pt-2 border-t border-border/40">
													<span className="text-xs font-semibold text-foreground">
														Đơn giá thi công:
													</span>
													<span className="font-bold text-primary text-base">
														40.000đ/m
													</span>
												</div>
											</div>

											<div className="bg-muted/30 border border-border/60 rounded-xl p-4 space-y-2">
												<span className="block text-xs font-medium text-muted-foreground">
													Khối lượng cọc bê tông:{" "}
													<strong className="text-primary">Nhỏ hơn 300m</strong>
												</span>
												<div className="flex justify-between items-center pt-2 border-t border-border/40">
													<span className="text-xs font-semibold text-foreground">
														Đơn giá thi công:
													</span>
													<div className="text-right">
														<span className="font-bold text-primary text-sm sm:text-base">
															8.000.000đ – 14.000.000đ
														</span>
														<span className="block text-[11px] font-normal text-muted-foreground">
															(Trọn gói công trình)
														</span>
													</div>
												</div>
											</div>
										</div>

										{/* GIAO DIỆN DESKTOP/TABLET: Bảng truyền thống */}
										<div className="hidden sm:block overflow-x-auto w-full">
											<Table className="min-w-full">
												<TableHeader>
													<TableRow className="bg-muted/50">
														<TableHead className="py-4 px-6 font-semibold text-sm">
															Quy Mô Công Trình
														</TableHead>
														<TableHead className="py-4 px-6 font-semibold text-right text-sm">
															Đơn Giá Thi Công
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													<TableRow>
														<TableCell className="py-4 px-6 font-medium text-foreground text-sm">
															Đối với những công trình có tổng khối lượng cọc bê
															tông{" "}
															<span className="text-primary font-bold">
																lớn hơn 300m
															</span>
														</TableCell>
														<TableCell className="py-4 px-6 text-right font-bold text-primary text-base whitespace-nowrap">
															40.000đ/m
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="py-4 px-6 font-medium text-foreground text-sm">
															Đối với những công trình có tổng khối lượng cọc{" "}
															<span className="text-primary font-bold">
																nhỏ hơn 300m
															</span>
														</TableCell>
														<TableCell className="py-4 px-6 text-right font-bold text-primary text-base whitespace-nowrap">
															8.000.000đ – 14.000.000đ{" "}
															<span className="block text-xs font-normal text-muted-foreground">
																(Trọn gói công trình)
															</span>
														</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</div>
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
									<CardHeader className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 bg-muted/40 p-4 sm:p-6">
										<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
											<LayersIcon className="w-6 h-6" />
										</div>
										<div>
											<CardTitle className="text-lg sm:text-xl">
												Bảng Giá Cọc Bê Tông Cốt Thép
											</CardTitle>
											<CardDescription className="text-xs sm:text-sm">
												Cọc đúc sẵn tại xưởng, đạt chuẩn kiểm định chất lượng
											</CardDescription>
										</div>
									</CardHeader>
									<CardContent className="p-4 sm:p-0">
										{/* GIAO DIỆN MOBILE: Dạng Thẻ Xếp Dọc */}
										<div className="grid grid-cols-1 gap-4 sm:hidden">
											<div className="bg-muted/30 border border-border/60 rounded-xl p-4 space-y-3">
												<div className="flex justify-between items-center border-b border-border/40 pb-2">
													<span className="font-bold text-foreground text-sm">
														Thép HVU
													</span>
													<span className="font-bold text-primary text-base">
														175.000đ/m
													</span>
												</div>
												<div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
													<div>
														<span className="block font-medium text-foreground/75">
															Mác:
														</span>
														C250
													</div>
													<div>
														<span className="block font-medium text-foreground/75">
															Thiết diện:
														</span>
														250x250
													</div>
													<div>
														<span className="block font-medium text-foreground/75">
															Chiều dài:
														</span>
														4m - 8m
													</div>
												</div>
											</div>

											<div className="bg-muted/30 border border-border/60 rounded-xl p-4 space-y-3">
												<div className="flex justify-between items-center border-b border-border/40 pb-2">
													<span className="font-bold text-foreground text-sm">
														Thép Việt Nhật
													</span>
													<span className="font-bold text-primary text-base">
														200.000đ/m
													</span>
												</div>
												<div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
													<div>
														<span className="block font-medium text-foreground/75">
															Mác:
														</span>
														C250
													</div>
													<div>
														<span className="block font-medium text-foreground/75">
															Thiết diện:
														</span>
														250x250
													</div>
													<div>
														<span className="block font-medium text-foreground/75">
															Chiều dài:
														</span>
														4m - 8m
													</div>
												</div>
											</div>
										</div>

										{/* GIAO DIỆN DESKTOP/TABLET: Bảng truyền thống */}
										<div className="hidden sm:block overflow-x-auto w-full">
											<Table className="min-w-150">
												<TableHeader>
													<TableRow className="bg-muted/50">
														<TableHead className="py-4 px-6 font-semibold text-sm">
															Loại Thép
														</TableHead>
														<TableHead className="py-4 px-6 font-semibold text-sm">
															Cấp Phối Mác
														</TableHead>
														<TableHead className="py-4 px-6 font-semibold text-sm">
															Thiết Diện
														</TableHead>
														<TableHead className="py-4 px-6 font-semibold text-sm">
															Chiều Dài
														</TableHead>
														<TableHead className="py-4 px-6 font-semibold text-right text-sm">
															Đơn Giá
														</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													<TableRow>
														<TableCell className="py-4 px-6 font-bold text-foreground text-sm whitespace-nowrap">
															Thép HVU
														</TableCell>
														<TableCell className="py-4 px-6 text-muted-foreground text-sm">
															C250
														</TableCell>
														<TableCell className="py-4 px-6 text-muted-foreground text-sm whitespace-nowrap">
															250 x 250
														</TableCell>
														<TableCell className="py-4 px-6 text-muted-foreground text-sm whitespace-nowrap">
															4m, 5m, 6m, 7m, 8m
														</TableCell>
														<TableCell className="py-4 px-6 text-right font-bold text-primary text-base whitespace-nowrap">
															175.000đ/m
														</TableCell>
													</TableRow>
													<TableRow>
														<TableCell className="py-4 px-6 font-bold text-foreground text-sm whitespace-nowrap">
															Thép Việt Nhật
														</TableCell>
														<TableCell className="py-4 px-6 text-muted-foreground text-sm">
															C250
														</TableCell>
														<TableCell className="py-4 px-6 text-muted-foreground text-sm whitespace-nowrap">
															250 x 250
														</TableCell>
														<TableCell className="py-4 px-6 text-muted-foreground text-sm whitespace-nowrap">
															4m, 5m, 6m, 7m, 8m
														</TableCell>
														<TableCell className="py-4 px-6 text-right font-bold text-primary text-base whitespace-nowrap">
															200.000đ/m
														</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</div>
									</CardContent>
								</Card>
							</Animate>
						</TabsContent>
					</Tabs>

					{/* Lưu ý báo giá */}
					<div className="mt-12 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/30 p-4 sm:p-6 rounded-2xl flex items-start gap-3 sm:gap-4">
						<HelpCircleIcon className="w-5 h-5 sm:w-6 sm:h-6 text-amber-600 shrink-0 mt-0.5" />
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
						<h3 className="text-lg sm:text-xl font-bold text-foreground">
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