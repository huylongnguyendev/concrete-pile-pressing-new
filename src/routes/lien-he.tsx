import { createFileRoute } from "@tanstack/react-router";
import {
	CheckCircle2Icon,
	ClockIcon,
	MailIcon,
	MapPinIcon,
	PhoneCallIcon,
	SendIcon,
} from "lucide-react";
import { Animate } from "#/components/base/animation/Animate";
import { Section } from "#/components/base/sections/Section";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Label } from "#/components/ui/label";

export const Route = createFileRoute("/lien-he")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="pt-20 min-h-screen flex flex-col">
			{/* Hero Header của trang Liên hệ */}
			<Section className="bg-gray-50/50 dark:bg-zinc-900/50 pt-12 pb-8 lg:py-16">
				<div className="text-center max-w-3xl mx-auto">
					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4"
					>
						<PhoneCallIcon className="w-4 h-4 shrink-0" />
						<span>Kết Nối Nhanh Chóng</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.2 }}
					>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-foreground">
							Liên Hệ Đơn Vị Ép Cọc Bê Tông Miền Nam
						</h1>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateY(-10px)" }}
						animate={{ opacity: 1, transform: "translateY(0)" }}
						transition={{ delay: 0.4 }}
					>
						<p className="mt-4 text-sm sm:text-base text-gray-600 font-medium">
							Chúng tôi luôn sẵn sàng lắng nghe, khảo sát mặt bằng miễn phí và
							tư vấn giải pháp ép cọc tối ưu nhất cho công trình tại Đồng Nai &
							Bà Rịa - Vũng Tàu.
						</p>
					</Animate>
				</div>
			</Section>

			{/* Nội dung chính: Thông tin liên hệ & Form */}
			<Section>
				<div className="py-8 lg:py-12 max-w-6xl mx-auto">
					<div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 items-start">
						{/* Cột Thông Tin (Bên trái - Chiếm 1 cột trên lg) */}
						<div className="space-y-6 lg:col-span-1">
							<Animate
								initial={{ opacity: 0, transform: "translateX(-20px)" }}
								animate={{ opacity: 1, transform: "translateX(0px)" }}
								className="space-y-6"
							>
								<Card className="border-border/60 shadow-sm">
									<CardHeader>
										<CardTitle className="text-xl">Thông Tin Trụ Sở</CardTitle>
										<CardDescription>
											Hỗ trợ trực tiếp 24/7 cho các chủ đầu tư
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4 text-sm">
										<div className="flex items-start gap-3">
											<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
												<MapPinIcon className="w-5 h-5" />
											</div>
											<div>
												<p className="font-semibold text-foreground">
													Địa chỉ cơ sở
												</p>
												<p className="text-muted-foreground mt-0.5">
													Khu vực Biên Hòa, Đồng Nai & Các vùng lân cận Miền Nam
												</p>
											</div>
										</div>

										<div className="flex items-center gap-3">
											<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
												<PhoneCallIcon className="w-5 h-5" />
											</div>
											<div>
												<p className="font-semibold text-foreground">
													Số điện thoại
												</p>
												<a
													href="tel:0123456789"
													className="text-primary font-bold hover:underline mt-0.5 block"
												>
													0123.456.789
												</a>
											</div>
										</div>

										<div className="flex items-center gap-3">
											<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0">
												<MailIcon className="w-5 h-5" />
											</div>
											<div>
												<p className="font-semibold text-foreground">
													Hộp thư điện tử
												</p>
												<p className="text-muted-foreground mt-0.5">
													epcocmiennam@gmail.com
												</p>
											</div>
										</div>

										<div className="flex items-start gap-3">
											<div className="p-2.5 bg-primary/10 text-primary rounded-xl shrink-0 mt-0.5">
												<ClockIcon className="w-5 h-5" />
											</div>
											<div>
												<p className="font-semibold text-foreground">
													Thời gian làm việc
												</p>
												<p className="text-muted-foreground mt-0.5">
													Thứ Hai - Chủ Nhật: 7:30 - 18:00
												</p>
											</div>
										</div>
									</CardContent>
								</Card>

								{/* Cam kết ngắn */}
								<div className="bg-primary/5 dark:bg-primary/10 border border-primary/20 p-6 rounded-2xl space-y-3">
									<div className="flex items-center gap-2 text-primary font-bold text-sm">
										<CheckCircle2Icon className="w-5 h-5 shrink-0" />
										<span>Cam Kết Dịch Vụ</span>
									</div>
									<p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
										Khảo sát mặt bằng tận nơi hoàn toàn miễn phí. Báo giá trọn
										gói minh bạch, không phát sinh chi phí phụ trong suốt quá
										trình thi công.
									</p>
								</div>
							</Animate>
						</div>

						{/* Cột Form Gửi Yêu Cầu Tư Vấn (Bên phải - Chiếm 2 cột trên lg) */}
						<div className="lg:col-span-2">
							<Animate
								initial={{ opacity: 0, transform: "translateX(20px)" }}
								animate={{ opacity: 1, transform: "translateX(0px)" }}
								transition={{ delay: 0.2 }}
							>
								<Card className="border-border/60 shadow-sm">
									<CardHeader>
										<CardTitle className="text-2xl">
											Gửi Yêu Cầu Tư Vấn & Báo Giá
										</CardTitle>
										<CardDescription>
											Điền thông tin chi tiết công trình, kỹ sư của chúng tôi sẽ
											liên hệ lại ngay lập tức
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form
											onSubmit={(e) => {
												e.preventDefault();
												alert(
													"Đã gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.",
												);
											}}
											className="space-y-6"
										>
											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label className="text-xs sm:text-sm font-semibold text-foreground">
														Họ và Tên của bạn
													</Label>
													<input
														type="text"
														required
														placeholder="Ví dụ: Anh Nam"
														className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
													/>
												</div>
												<div className="space-y-2">
													<Label className="text-xs sm:text-sm font-semibold text-foreground">
														Số Điện Thoại
													</Label>
													<input
														type="tel"
														required
														placeholder="Ví dụ: 0912345xxx"
														className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
													/>
												</div>
											</div>

											<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
												<div className="space-y-2">
													<Label className="text-xs sm:text-sm font-semibold text-foreground">
														Khu Vực Thi Công
													</Label>
													<select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
														<option value="bien-hoa">
															TP. Biên Hòa, Đồng Nai
														</option>
														<option value="long-thanh">
															Huyện Long Thành, Đồng Nai
														</option>
														<option value="nhon-trach">
															Huyện Nhơn Trạch, Đồng Nai
														</option>
														<option value="vung-tau">
															TP. Vũng Tàu, BR-VT
														</option>
														<option value="ba-ria">TP. Bà Rịa, BR-VT</option>
														<option value="phu-my">Thị xã Phú Mỹ, BR-VT</option>
														<option value="khac">Khu vực khác miền Nam</option>
													</select>
												</div>
												<div className="space-y-2">
													<Label className="text-xs sm:text-sm font-semibold text-foreground">
														Giải Pháp Quan Tâm
													</Label>
													<select className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all">
														<option value="ep-tai">
															Ép cọc tải sắt (Công trình lớn)
														</option>
														<option value="ep-neo">
															Ép cọc neo (Nhà dân, hẻm nhỏ)
														</option>
														<option value="cung-cap-coc">
															Cung cấp cọc BTCT cốt thép
														</option>
														<option value="tu-van-chung">
															Tư vấn chung / Khảo sát địa chất
														</option>
													</select>
												</div>
											</div>

											<div className="space-y-2">
												<Label className="text-xs sm:text-sm font-semibold text-foreground">
													Nội dung yêu cầu chi tiết (Quy mô nhà, số tầng...)
												</Label>
												<textarea
													rows={4}
													placeholder="Ví dụ: Tôi muốn ép cọc cho nhà dân 3 tầng diện tích 5x15m tại Biên Hòa..."
													className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all resize-none"
												></textarea>
											</div>

											<Button
												type="submit"
												size="lg"
												className="w-full py-4 h-auto text-base font-bold shadow-md"
											>
												<SendIcon className="w-5 h-5 mr-2" />
												<span>Gửi Yêu Cầu Tư Vấn Miễn Phí</span>
											</Button>
										</form>
									</CardContent>
								</Card>
							</Animate>
						</div>
					</div>
				</div>
			</Section>
		</div>
	);
}
