import { useAppStore } from "@lavaz/store";
import { MailIcon, SmartphoneIcon } from "lucide-react";
import { store } from "#/store/store";

export function HeaderTop() {
	const [{ phoneNumber, emails, addresses }] = useAppStore(
		store.company,
		(s) => s,
	);

	return (
		<div className="py-1 bg-primary text-primary-foreground">
			<div className="box flex items-center gap-8 h-5 ">
				<a
					href={`tel:${phoneNumber ?? "+84967386080"}`}
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<SmartphoneIcon size={16} />
					<span>
						{phoneNumber[0]?.number.replace("+84", "0") ?? "0967.386.080"}
					</span>
				</a>
				<a
					href={`mailto:${emails[0]?.mail ?? "epcocbetonghungdung@gmail.com"}`}
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<MailIcon size={16} />
					<span>{emails[0]?.mail ?? "epcocbetonghungdung@gmail.com"}</span>
				</a>
			</div>
		</div>
	);
}
