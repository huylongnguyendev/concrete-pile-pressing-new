import type { PhoneNumberItem } from "#/types/company.type";
import { ContactInputItem } from "../ContactInputItem";

export function PhoneForm({ values }: { values: PhoneNumberItem[] }) {
	return (
		<>
			{values.map((value, index) => (
				<ContactInputItem
					key={value.id}
					value={value.number}
					index={index}
					isManyData={values.length <= 1}
					id={value.id}
					type="phoneNumber"
					priority={value.priority === undefined ? false : value.priority}
				/>
			))}
		</>
	);
}
