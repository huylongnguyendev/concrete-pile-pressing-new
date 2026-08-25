
import { MailIcon, MapPinIcon, PhoneCallIcon } from "lucide-react";
import contact from "@/data/json/contact.json" with {type: "json"};

export function FooterWithData() {
	const {phoneNumber,  address, email} = contact
	return (
		<ul className="space-y-3 text-sm text-zinc-400 font-medium">
				<li className="flex items-center gap-3">
					<PhoneCallIcon className="w-4 h-4 text-primary shrink-0" />
					<a
						href={`tel:${phoneNumber}`}
						className="hover:text-white transition-colors font-bold text-white"
					>
						{phoneNumber ? phoneNumber.replace("+84", "0") : ""}
					</a>
				</li>
				<li className="flex items-center gap-3">
					<MailIcon className="w-4 h-4 text-primary shrink-0" />
					<a
						href={`mailto:${email}`}
						className="hover:text-white transition-colors font-bold text-white"
					>
						{email}
					</a>
				</li>

					<li  className="flex items-start gap-3">
						<MapPinIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
						<span className="text-zinc-300">
							{address}
						</span>
					</li>
		</ul>
	);
}
