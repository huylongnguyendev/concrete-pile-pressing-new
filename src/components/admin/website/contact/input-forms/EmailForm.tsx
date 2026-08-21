import type { Email } from "#/types/company.type";
import { ContactInputItem } from "../ContactInputItem";

export function EmailForm({ values }: { values: Email[] }) {
	return (
		<>
			{values.map((value, index) => (
				<ContactInputItem
					key={value.id}
					value={value.mail}
					index={index}
					isManyData={values.length <= 1}
					type="emails"
					id={value.id}
					priority={value.priority === undefined ? false : value.priority}
				/>
			))}
		</>
	);
}
