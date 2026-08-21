import { useSuspenseQuery } from "@tanstack/react-query";
import { PhoneCallIcon } from "lucide-react";
import { companyQuery } from "#/db/query/company.query";
import { Button } from "./ui/button";

export function ContactBtn() {
	const { data } = useSuspenseQuery(companyQuery);

	const phoneNumber = data?.companies[0]?.phoneNumber ?? [];

	return (
		<Button
			size="lg"
			className="py-4 h-auto text-base font-bold shadow-md hover:shadow-lg transition-all"
			asChild
		>
			<a href={`tel:${phoneNumber[0]?.number}`}>
				<PhoneCallIcon className="w-5 h-5 mr-2" />
				<span>
					Gọi Tư Vấn Ngay: {phoneNumber[0]?.number.replace("+84", "0")}
				</span>
			</a>
		</Button>
	);
}
