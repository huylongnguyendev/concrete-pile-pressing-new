import { useLoaderData } from "@tanstack/react-router";
import { MailIcon, SmartphoneIcon } from "lucide-react";

export function HeaderTop() {
	const { company } = useLoaderData({ from: "__root__" });
	return (
		<div className="py-1 bg-primary text-primary-foreground">
			<div className="box flex items-center gap-8 h-5 ">
				<a
					href={`tel:${company?.phoneNumber ?? "+84967386080"}`}
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<SmartphoneIcon size={16} />
					<span>
						{company?.phoneNumber[0].replace("+84", "0") ?? "0967.386.080"}
					</span>
				</a>
				<a
					href={`mailto:${company?.email ?? "epcocbetonghungdung@gmail.com"}`}
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<MailIcon size={16} />
					<span>{company?.address ?? "epcocbetonghungdung@gmail.com"}</span>
				</a>
			</div>
		</div>
	);
}
