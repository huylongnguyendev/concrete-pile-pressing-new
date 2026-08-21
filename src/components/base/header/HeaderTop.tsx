import { useSuspenseQuery } from "@tanstack/react-query";
import { Mail, MapPin, Phone } from "lucide-react";
import { companyQuery } from "#/db/query/company.query";

export function HeaderTop() {
	const { data } = useSuspenseQuery(companyQuery);

	const company = data?.companies?.[0];
	const primaryPhone = company?.phoneNumber?.[0]?.number;
	const primaryEmail = company?.emails?.[0]?.mail;
	const primaryAddress = company?.addresses?.[0]?.address;

	// Format số điện thoại hiển thị (chuyển +84 thành 0 nếu có)
	const formattedPhone = primaryPhone?.replace("+84", "0") ?? "0967 386 080";
	const telHref = primaryPhone ?? "+84967386080";

	return (
		<div className="bg-primary text-primary-foreground border-b border-primary-foreground/10 transition-all">
			<div className="box flex flex-wrap items-center justify-between gap-4 py-2 text-xs font-medium">
				<div className="flex flex-wrap items-center gap-6">
					{primaryPhone && (
						<a
							href={`tel:${telHref}`}
							className="group inline-flex items-center gap-2 transition-colors hover:text-accent-foreground/80"
							title="Gọi điện cho chúng tôi"
						>
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform group-hover:scale-110">
								<Phone className="h-3.5 w-3.5" />
							</span>
							<span className="tracking-wide">{formattedPhone}</span>
						</a>
					)}

					{primaryEmail && (
						<a
							href={`mailto:${primaryEmail}`}
							className="group inline-flex items-center gap-2 transition-colors hover:text-accent-foreground/80"
							title="Gửi email cho chúng tôi"
						>
							<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10 transition-transform group-hover:scale-110">
								<Mail className="h-3.5 w-3.5" />
							</span>
							<span className="tracking-wide">{primaryEmail}</span>
						</a>
					)}
				</div>

				{primaryAddress && (
					<div className="hidden md:inline-flex items-center gap-2 text-primary-foreground/80">
						<span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary-foreground/10">
							<MapPin className="h-3.5 w-3.5" />
						</span>
						<span className="truncate max-w-xs lg:max-w-md">
							{primaryAddress}
						</span>
					</div>
				)}
			</div>
		</div>
	);
}