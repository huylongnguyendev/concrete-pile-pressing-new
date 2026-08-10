import type React from "react";
import { TooltipProvider } from "#/components/ui/tooltip";

export function AppProvider({
	children,
}: {
	children: Readonly<React.ReactNode>;
}) {
	return <TooltipProvider>{children}</TooltipProvider>;
}
