import { Badge } from "#/components/ui/badge";
import { Separator } from "#/components/ui/separator";
import { cn } from "#/lib/utils";

export function StepProgress({ currentStep }: { currentStep: number }) {
	return (
		<div className="px-4 w-full max-w-md mx-auto">
			<div className="relative z-10">
				<Separator className="absolute top-1/2 left-0 w-full -z-10" />
				<div className="flex justify-between gap-4 items-center max-sm:hidden">
					<Badge
						className={cn(
							currentStep !== 1 && "bg-secondary text-secondary-foreground",
							currentStep > 1 && "border-primary text-primary",
						)}
					>
						Bước 1
					</Badge>
					<Badge
						className={cn(
							currentStep !== 2 && "bg-secondary text-secondary-foreground",
							currentStep > 2 && "border-primary text-primary",
						)}
					>
						Bước 2
					</Badge>
					<Badge
						className={cn(
							currentStep !== 3 && "bg-secondary text-secondary-foreground",
						)}
					>
						Bước 3
					</Badge>
				</div>
				<div className="flex justify-between gap-4 items-center sm:hidden font-semibold">
					<p
						className={cn(
							"rounded-full size-8 text-primary-foreground flex justify-center items-center",
							currentStep === 1
								? "bg-primary"
								: "bg-secondary text-secondary-foreground",
							currentStep > 1 && "border-2 border-primary text-primary",
						)}
					>
						1
					</p>
					<p
						className={cn(
							"rounded-full size-8 text-primary-foreground flex justify-center items-center",
							currentStep === 2
								? "bg-primary"
								: "bg-secondary text-secondary-foreground",
							currentStep > 2 && "border-2 border-primary text-primary",
						)}
					>
						2
					</p>
					<p
						className={cn(
							"rounded-full size-8 text-primary-foreground flex justify-center items-center",
							currentStep === 3
								? "bg-primary"
								: "bg-secondary text-secondary-foreground",
						)}
					>
						3
					</p>
				</div>
			</div>
		</div>
	);
}
