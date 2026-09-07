import { PhoneCallIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import contact from "#/data/json/contact.json" with { type: "json" };

export function ContactCta() {
	const { phoneNumber } = contact;
	return (
		<Button asChild>
			<a href={`tel:${phoneNumber}`}>
				<PhoneCallIcon />
				<span className="max-lg:hidden">Tư vấn Miễn phí</span>
			</a>
		</Button>
	);
}
