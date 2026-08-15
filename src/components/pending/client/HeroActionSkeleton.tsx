import { Skeleton } from "#/components/ui/skeleton";

export function HeroActionSkeleton() {
	return (
		<div className="mt-6 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
			<Skeleton className="w-full sm:w-44 h-11 rounded-md bg-zinc-800" />
			<Skeleton className="w-full sm:w-40 h-11 rounded-md bg-zinc-800" />
		</div>
	);
}
