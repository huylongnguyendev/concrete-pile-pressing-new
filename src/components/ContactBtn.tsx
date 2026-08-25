import { PhoneCallIcon } from "lucide-react";
import contact from "@/data/json/contact.json" with { type: "json" };
import { Button } from "./ui/button";

export function ContactBtn() {
	const { phoneNumber } = contact;

	return (
		<Button
			size="lg"
			className="py-4 h-auto text-base font-bold shadow-md hover:shadow-lg transition-all"
			asChild
		>
			<a href={`tel:${phoneNumber}`}>
				<PhoneCallIcon className="w-5 h-5 mr-2" />
				<span>Gọi Tư Vấn Ngay: {phoneNumber.replace("+84", "0")}</span>
			</a>
		</Button>
	);
}
