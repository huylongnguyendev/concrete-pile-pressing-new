import { useAppStore } from "@lavaz/store";
import { PhoneCallIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { store } from "#/store/store";

export function ContactCta() {
	const [phoneNumber] = useAppStore(store.company, (s) => s.phoneNumber);
	return (
		<Button asChild>
			<a href={`to:${phoneNumber[0]?.number ?? "+84967386080"}`}>
				<PhoneCallIcon />
				<span className="max-lg:hidden">Tư vấn Miễn phí</span>
			</a>
		</Button>
	);
}
