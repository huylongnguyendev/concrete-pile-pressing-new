import type React from "react";
import { cn } from "#/lib/utils";

export function Section({
	className,
	screen = true,
	...props
}: React.ComponentProps<"section"> & { screen?: boolean }) {
	return <section className={cn("pt-22",!screen && "box")} {...props} />;
}
