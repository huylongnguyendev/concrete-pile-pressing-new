import { useLoaderData } from "@tanstack/react-router";
import { PhoneCallIcon } from "lucide-react";
import { Button } from "./ui/button";

export function ContactBtn() {
	const { company } = useLoaderData({ from: "__root__" });
	return (
		<Button
			size="lg"
			className="py-4 h-auto text-base font-bold shadow-md hover:shadow-lg transition-all"
			asChild
		>
			<a href={`tel:${company?.phoneNumber ?? "+84967386080"}`}>
				<PhoneCallIcon className="w-5 h-5 mr-2" />
				<span>
					Gọi Tư Vấn Ngay:{" "}
					{company?.phoneNumber[0].replace("+84", "0") ?? "0967.386.080"}
				</span>
			</a>
		</Button>
	);
}
