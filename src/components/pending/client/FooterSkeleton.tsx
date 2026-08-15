import { MailIcon, MapPinIcon, PhoneCallIcon } from "lucide-react";
import { Skeleton } from "#/components/ui/skeleton";

export function FooterSkeleton() {
	return (
		<ul className="space-y-3 text-sm text-zinc-400 font-medium">
			{/* Skeleton Địa chỉ */}
			<li className="flex items-start gap-3">
				<MapPinIcon className="w-5 h-5 text-zinc-600 shrink-0 mt-0.5" />
				<Skeleton className="h-4 w-3/4 bg-zinc-800" />
			</li>

			{/* Skeleton Số điện thoại */}
			<li className="flex items-center gap-3">
				<PhoneCallIcon className="w-4 h-4 text-zinc-600 shrink-0" />
				<Skeleton className="h-4 w-32 bg-zinc-800" />
			</li>

			{/* Skeleton Email */}
			<li className="flex items-center gap-3">
				<MailIcon className="w-4 h-4 text-zinc-600 shrink-0" />
				<Skeleton className="h-4 w-48 bg-zinc-800" />
			</li>
		</ul>
	);
}
