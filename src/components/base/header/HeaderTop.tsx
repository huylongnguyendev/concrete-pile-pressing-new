import { useSuspenseQuery } from "@tanstack/react-query";
import { MailIcon, MapPin, SmartphoneIcon } from "lucide-react";
import { companyQuery } from "#/db/query/company.query";

export function HeaderTop() {
	const { data } = useSuspenseQuery(companyQuery);

	const company = data?.companies[0];
	const phoneNumber = company?.phoneNumber ?? [];
	const emails = company?.emails ?? [];
	const addresses = company?.addresses ?? [];

	return (
		<div className="py-1 bg-primary text-primary-foreground">
			<div className="box flex items-center gap-8 h-5 ">
				<a
					href={`tel:${phoneNumber ?? "+84967386080"}`}
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<SmartphoneIcon size={16} />
					<span>{phoneNumber[0]?.number.replace("+84", "0")}</span>
				</a>
				<a
					href={`mailto:${emails[0]?.mail}`}
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<MailIcon size={16} />
					<span>{emails[0]?.mail}</span>
				</a>
				<p className="inline-flex justify-center items-center gap-1 text-sm">
					<MapPin />
					<span>{addresses[0]?.address}</span>
				</p>
			</div>
		</div>
	);
}
