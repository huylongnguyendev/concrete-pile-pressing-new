import { Mail, MapPin, Phone } from "lucide-react";
import contact from "@/data/json/contact.json" with { type: "json" };

export function HeaderTop() {
	const { address, email, phoneNumber } = contact;
	return (
		<div className="bg-primary text-primary-foreground border-b border-primary-foreground/10 transition-all">
			<div className="box flex max-sm:hidden max-sm:justify-center items-center justify-between gap-4 py-2 text-xs font-medium">
				<div className="flex flex-wrap items-center gap-6">
					{phoneNumber && (
						<a
							href={`tel:${phoneNumber}`}
							className="group inline-flex items-center gap-2 transition-colors hover:text-accent-foreground/80"
							title="Gọi điện cho chúng tôi"
						>
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform group-hover:scale-110">
								<Phone className="h-3.5 w-3.5" />
							</span>
							<span className="tracking-wide">
								{phoneNumber.replace(/^\+84/, "0")}
							</span>
						</a>
					)}

					{email && (
						<a
							href={`mailto:${email}`}
							className="group inline-flex items-center gap-2 transition-colors hover:text-accent-foreground/80"
							title="Gửi email cho chúng tôi"
						>
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform group-hover:scale-110">
								<Mail className="h-3.5 w-3.5" />
							</span>
							<span className="tracking-wide">{email}</span>
						</a>
					)}
				</div>

				{address && (
					<div className="hidden md:inline-flex items-center gap-2 text-primary-foreground/80">
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10">
							<MapPin className="h-3.5 w-3.5" />
						</span>
						<span className="truncate max-w-xs lg:max-w-md">{address}</span>
					</div>
				)}
			</div>
		</div>
	);
}
