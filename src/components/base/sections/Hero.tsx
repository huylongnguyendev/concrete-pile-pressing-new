import { Link } from "@tanstack/react-router";
import { Building2Icon, PhoneCallIcon, Sparkles } from "lucide-react";
import { CountUp } from "#/components/CountUp";
import { Button } from "#/components/ui/button";
import { quickFeature, quickStat } from "#/data/hero.data";
import { Animate } from "../animation/Animate";
import { Section } from "./Section";
import { HerroAction } from "#/components/HerroAction";
import { Suspense } from "react";
import { HeroActionSkeleton } from "#/components/pending/client/HeroActionSkeleton";

export function Hero() {
	return (
		<Section hero>
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center py-6 lg:py-12">
				{/* Cột Nội Dung (Text Content) */}
				<div className="text-center lg:text-left">
					<Animate
						initial={{ opacity: 0, transform: "translateX(-20px)" }}
						animate={{ opacity: 1, transform: "translateX(0)" }}
						className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-semibold mb-4 mx-auto lg:mx-0"
					>
						<Sparkles className="w-4 h-4 shrink-0" />
						<span>Đơn Vị Ép Cọc Bê Tông Số 1 Miền Nam</span>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateX(-20px)" }}
						animate={{ opacity: 1, transform: "translateX(0)" }}
						transition={{ delay: 0.6 }}
					>
						<h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight leading-tight">
							<span className="block text-foreground">
								Giải Pháp Ép Cọc Bê Tông{" "}
								<span className="text-primary underline decoration-wavy decoration-primary/40 underline-offset-8">
									Vững Chắc
								</span>{" "}
								Tại
							</span>
							<span className="block mt-2">Đồng Nai & Bà Rịa - Vũng Tàu</span>
						</h1>
					</Animate>

					<Animate
						initial={{ opacity: 0, transform: "translateX(-20px)" }}
						animate={{ opacity: 1, transform: "translateX(0)" }}
						transition={{ delay: 1.2 }}
					>
						<p className="mt-4 text-sm sm:text-lg text-gray-600 max-w-2xl font-medium mx-auto lg:mx-0">
							Chuyên gia thi công{" "}
							<strong className="text-foreground font-semibold">
								ép cọc tải, ép cọc neo, cọc bê tông cốt thép
							</strong>{" "}
							cho nhà dân, biệt thự và công trình công nghiệp. Cam kết không lún
							nứt, đúng tiến độ kỹ thuật.
						</p>
					</Animate>
					<div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-x-6 gap-y-2 text-sm text-gray-700 font-medium">
						{quickFeature.map((feature, index) => {
							const Icon = feature.icon;
							return (
								<Animate
									initial={{ opacity: 0, transform: "translateY(20px)" }}
									animate={{ opacity: 1, transform: "translateY(0px)" }}
									transition={{ delay: 1.2 * index * 0.1 }}
									key={feature.label}
									className="flex items-center gap-1"
								>
									<Icon className="w-4 h-4 text-primary shrink-0" />
									<span>{feature.label}</span>
								</Animate>
							);
						})}
					</div>

					<div className="mt-6 grid grid-cols-3 gap-4 py-4 border-y border-gray-100 max-w-lg mx-auto lg:mx-0">
						{quickStat.map((stat, index) => {
							return (
								<Animate
									key={stat.label}
									initial={{ opacity: 0, transform: "translateY(20px)" }}
									animate={{ opacity: 1, transform: "translateY(0px)" }}
									transition={{ delay: 1.8 * index * 0.1 }}
									className="flex flex-col items-center lg:items-start"
								>
									<CountUp item={stat} index={index} />
								</Animate>
							);
						})}
					</div>

					<Suspense fallback={<HeroActionSkeleton />}>
						<HerroAction />
					</Suspense>
				</div>

				<Animate
					initial={{ opacity: 0, transform: "translateX(20px)" }}
					animate={{ opacity: 1, transform: "translateX(0px)" }}
					transition={{ delay: 1.2 }}
					className="relative w-full"
				>
					<div className="relative rounded-2xl overflow-hidden shadow-xl border border-gray-100 aspect-video lg:aspect-4/3 w-full">
						<img
							src="/images/ep-coc-be-tong-dong-nai-vung-tau.jpg"
							alt="Thi công ép cọc bê tông cốt thép uy tín tại Đồng Nai và Bà Rịa Vũng Tàu"
							className="w-full h-full object-cover"
							loading="eager"
							fetchPriority="high"
							width={800}
							height={600}
						/>
					</div>
					{/* Hiệu ứng nền trang trí */}
					<div className="absolute -bottom-6 -left-6 bg-primary/10 w-48 h-48 lg:w-72 lg:h-72 rounded-full blur-3xl -z-10 hidden sm:block" />
				</Animate>
			</div>
		</Section>
	);
}
