import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { Building2Icon, PhoneCallIcon } from "lucide-react";
import { getCompanyFn } from "#/db/services/company.service";
import { Animate } from "./base/animation/Animate";
import { Button } from "./ui/button";

export function HerroAction() {
	const { data } = useSuspenseQuery({
		queryKey: ["company"],
		queryFn: () => getCompanyFn(),
		staleTime: 60 * 1000 * 5,
	});
	const phoneNumber =
		data?.companies[0]?.phoneNumber?.find((p) => p.priority) ||
		data?.companies[0]?.phoneNumber?.[0];
	return (
		<Animate
			initial={{ opacity: 0, transform: "translateY(20px)" }}
			animate={{ opacity: 1, transform: "translateY(0px)" }}
			transition={{ delay: 2.4 }}
			className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4"
		>
			<Button
				variant={"secondary"}
				asChild
				className="w-full sm:w-auto px-6 py-3 h-auto capitalize shadow-sm hover:shadow transition-all"
			>
				<Link to="/du-an">
					<Building2Icon className="w-5 h-5 mr-2 shrink-0" />
					<span>công trình đã thi công</span>
				</Link>
			</Button>

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
