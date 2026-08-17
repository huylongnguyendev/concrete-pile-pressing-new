import { useSuspenseQuery } from "@tanstack/react-query";
import { MailIcon, MapPinIcon, PhoneCallIcon } from "lucide-react";
import { companyQuery } from "#/db/query/company.query";
import { Separator } from "@/components/ui/separator";

export function FooterWithData() {
	const { data } = useSuspenseQuery(companyQuery);

	const company = data?.companies[0];
	const phoneNumber = company?.phoneNumber ?? [];
	const emails = company?.emails ?? [];
	const addresses = company?.addresses ?? [];

	// Sắp xếp ưu tiên phần tử có priority: true lên đầu tiên
	const sortedPhones = [...phoneNumber].sort(
		(a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0),
	);
	const sortedEmails = [...emails].sort(
		(a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0),
	);
	const sortedAddresses = [...addresses].sort(
		(a, b) => (b.priority ? 1 : 0) - (a.priority ? 1 : 0),
	);

	return (
		<ul className="space-y-3 text-sm text-zinc-400 font-medium">
			{/* Danh sách Số điện thoại */}
			{sortedPhones.map((phone, i) => (
				<li key={phone?.id ?? i} className="flex items-center gap-3">
					<PhoneCallIcon className="w-4 h-4 text-primary shrink-0" />
					<a
						href={`tel:${phone?.number}`}
						className="hover:text-white transition-colors font-bold text-white"
					>
						{phone?.number ? phone.number.replace("+84", "0") : ""}
						{phone?.priority && (
							<span className="ml-2 text-xs text-primary font-normal">
								(Hotline chính)
							</span>
						)}
					</a>
					{i < sortedPhones.length - 1 ? (
						<Separator orientation="vertical" />
					) : null}
				</li>
			))}

			{/* Danh sách Email */}
			{sortedEmails.map((email, i) => (
				<li key={email?.id ?? i} className="flex items-center gap-3">
					<MailIcon className="w-4 h-4 text-primary shrink-0" />
					<a
						href={`mailto:${email?.mail}`}
						className="hover:text-white transition-colors font-bold text-white"
					>
						{email?.mail ?? ""}
						{email?.priority && (
							<span className="ml-2 text-xs text-primary font-normal">
								(Email chính)
							</span>
						)}
					</a>
					{i < sortedEmails.length - 1 ? (
						<Separator orientation="vertical" />
					) : null}
				</li>
			))}

			{/* Danh sách Địa chỉ (Hiển thị Trụ sở chính và Chi nhánh) */}
			{sortedAddresses.map((add, i) => {
				const label = i === 0 ? "Trụ sở chính: " : `Chi nhánh ${i}: `;
				return (
					<li key={add?.id ?? i} className="flex items-start gap-3">
						<MapPinIcon className="w-5 h-5 text-primary shrink-0 mt-0.5" />
						<span className="text-zinc-300">
							<strong className="text-white">{label}</strong>
							{add?.address}
						</span>
					</li>
				);
			})}
		</ul>
	);
}
