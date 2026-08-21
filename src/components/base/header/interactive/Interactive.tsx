import { SearchToggle } from "../actions/SearchToggle";
import { ContactCta } from "./ContactCta";

export function Interactive() {
	return (
		<div className="flex items-center gap-2 lg:gap-4">
			<SearchToggle />
			<ContactCta />
		</div>
	);
}
