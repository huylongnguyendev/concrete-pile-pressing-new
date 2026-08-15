import { MailIcon, MapPin, SmartphoneIcon } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton"; // 👈 Đường dẫn trỏ tới component skeleton của shadcn

export function HeaderTopSkeleton() {
	return (
		<div className="py-1 bg-primary text-primary-foreground">
			<div className="box flex gap-8 h-5 items-center">
				{/* Skeleton số điện thoại */}
				<div className="inline-flex items-center gap-1.5 text-sm">
					<SmartphoneIcon size={16} className="opacity-70" />
					<Skeleton className="h-4 w-28 bg-primary-foreground/20" />
				</div>

				{/* Skeleton email */}
				<div className="inline-flex items-center gap-1.5 text-sm">
					<MailIcon size={16} className="opacity-70" />
					<Skeleton className="h-4 w-48 bg-primary-foreground/20" />
				</div>

				{/* Skeleton địa chỉ */}
				<div className="inline-flex items-center gap-1.5 text-sm">
					<MapPin size={16} className="opacity-70" />
					<Skeleton className="h-4 w-56 bg-primary-foreground/20" />
				</div>
			</div>
		</div>
	);
}
