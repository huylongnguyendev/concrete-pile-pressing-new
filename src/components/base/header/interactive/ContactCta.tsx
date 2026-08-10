import { PhoneCallIcon } from "lucide-react";
import { Button } from "#/components/ui/button";

export function ContactCta() {
	return (
		<Button asChild>
			<a href="to:+84967386080">
				<PhoneCallIcon />
				<span>Tư vấn Miễn phí</span>
			</a>
		</Button>
	);
}
