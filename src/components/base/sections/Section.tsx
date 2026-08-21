import type React from "react";
import { cn } from "#/lib/utils";

export function Section({
	className,
	hero = false,
	...props
}: React.ComponentProps<"section"> & { hero?: boolean }) {
	return <section className={cn("py-12 box", hero && "pt-20")} {...props} />;
}
