import { Suspense } from "react";
import { HeaderTopSkeleton } from "#/components/pending/client/HeaderTopSkeleton";
import { HeaderBot } from "./HeaderBot";
import { HeaderTop } from "./HeaderTop";
import { SearchBar } from "./interactive/SearchBar";

export function Header() {
	return (
		<header className="fixed top-0 left-0 w-full bg-background shadow-xs z-999">
			<Suspense fallback={<HeaderTopSkeleton />}>
				<HeaderTop />
			</Suspense>
			<HeaderBot />
			<SearchBar />
		</header>
	);
}
