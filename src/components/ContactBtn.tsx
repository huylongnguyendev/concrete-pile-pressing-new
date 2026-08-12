import { PhoneCallIcon } from "lucide-react";
import { Button } from "./ui/button";

export function ContactBtn() {
	return (
		<Button
			size="lg"
			className="py-4 h-auto text-base font-bold shadow-md hover:shadow-lg transition-all"
			asChild
		>
			<a href="tel:0123456789">
				<PhoneCallIcon className="w-5 h-5 mr-2" />
				<span>Gọi Tư Vấn Ngay: 0123.456.789</span>
			</a>
		</Button>
	);
}
