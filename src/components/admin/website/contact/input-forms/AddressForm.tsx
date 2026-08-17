import type { Address } from "#/types/company.type";
import { ContactInputItem } from "../ContactInputItem";

export function AddressForm({ values }: { values: Address[] }) {
	return (
		<>
			{values.map((value, index) => (
				<ContactInputItem
					key={value.id}
					value={value.address}
					index={index}
					isManyData={values.length <= 1}
					type="addresses"
					id={value.id}
					priority={value.priority === undefined ? false : value.priority}
				/>
			))}
		</>
	);
}
