import { Animate } from "../base/animation/Animate";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { ContactForm } from "./ContactForm";

export function ContactBox() {
	return (
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
							Điền thông tin chi tiết công trình, kỹ sư của chúng tôi sẽ liên hệ
							lại ngay lập tức
						</CardDescription>
					</CardHeader>
					<CardContent>
						<ContactForm />
					</CardContent>
				</Card>
			</Animate>
		</div>
	);
}
