import { PhoneCallIcon } from "lucide-react";
import contact from "@/data/json/contact.json" with { type: "json" };
import { Animate } from "./base/animation/Animate";
import { Button } from "./ui/button";

export function HerroAction() {
	const { phoneNumber } = contact;
	return (
		<Animate
			initial={{ opacity: 0, transform: "translateY(20px)" }}
			animate={{ opacity: 1, transform: "translateY(0px)" }}
			transition={{ delay: 2.4 }}
			className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
		>
			<Button
				asChild
				className="w-full sm:w-auto px-6 py-3 h-auto shadow-sm hover:shadow transition-all"
			>
				<a href={`tel:${phoneNumber}`}>
					<PhoneCallIcon className="w-5 h-5 mr-2 shrink-0" />
					<span>Tư vấn Miễn phí</span>
				</a>
			</Button>
		</Animate>
	);
}
