import { HeaderBot } from "./HeaderBot";
import { HeaderTop } from "./HeaderTop";
import { SearchBar } from "./interactive/SearchBar";

export function Header() {
	return (
		<header className="sticky top-0 w-full bg-background shadow-xs">
			<HeaderTop />
			<HeaderBot />
			<SearchBar />
		</header>
	);
}
