import { useAppStore } from "@lavaz/store";
import { PhoneCallIcon } from "lucide-react";
import { store } from "#/store/store";
import { Button } from "./ui/button";

export function ContactBtn() {
	const [phoneNumber] = useAppStore(store.company, (s) => s.phoneNumber);
	return (
		<Button
			size="lg"
			className="py-4 h-auto text-base font-bold shadow-md hover:shadow-lg transition-all"
			asChild
		>
			<a href={`tel:${phoneNumber?.[0].number ?? "+84967386080"}`}>
				<PhoneCallIcon className="w-5 h-5 mr-2" />
				<span>
					Gọi Tư Vấn Ngay:{" "}
					{phoneNumber?.[0].number.replace("+84", "0") ?? "0967.386.080"}
				</span>
			</a>
		</Button>
	);
}
