import { createBox } from "@lavaz/store";
import type { Company, ContactType } from "#/types/company.type";

interface CompanyInputState extends Company {
	canSubmit: boolean;
}

const initialState = {
	id: "data-default",
	phoneNumber: [{ id: "", number: "" }],
	addresses: [{ id: "", address: "" }],
	emails: [{ id: "", mail: "" }],
	canSubmit: false,
} satisfies CompanyInputState as CompanyInputState;

const getNewID = (index: number) => {
	const randomNumber1 = Math.random();
	const randomNumber2 = Math.random() * 8;
	const newId = `data-${Math.floor(randomNumber1 * 10000 * index * randomNumber2)}`;
	return newId;
};

export const companyInputBox = createBox(initialState, (set) => ({
	setValue: ({
		id,
		value,
		type,
	}: {
		id: string;
		value: string;
		type: ContactType;
	}) =>
		set((prev) => {
			const current = prev[type];
			const existing = current.find((item) => item.id === id);

			const currentKey = (
				type === "phoneNumber"
					? "number"
					: type === "addresses"
						? "address"
						: "mail"
			) as keyof typeof current;

			if (existing) {
				const newValue = current.map((item) =>
					item.id === id ? { ...item, [currentKey]: value } : item,
				);
				return { ...prev, [type]: newValue, canSubmit: true };
			} else {
				const newId = getNewID(current.length + 1);
				const newValue = [...current, { id: newId, [currentKey]: value }];
				return { ...prev, [type]: newValue, canSubmit: true };
			}
		}),
	setAll: (state: CompanyInputState) => set(state),
	setRemove: ({ id, type }: { id: string; type: ContactType }) =>
		set((prev) => {
			const current = prev[type];
			const newValue = current.filter((item) => item.id !== id);
			return { ...prev, [type]: newValue };
		}),
	setAdd: (type: ContactType) =>
		set((prev) => {
			const current = prev[type];
			const id = getNewID(current.length);
			const currentKey = (
				type === "phoneNumber"
					? "number"
					: type === "addresses"
						? "address"
						: "mail"
			) as keyof typeof current;

			const newValues = [...current, { id, [currentKey]: "", piority: false }];
			return { ...prev, [type]: newValues };
		}),
	setPriority: ({ id, type }: { id: string; type: ContactType }) =>
		set((prev) => {
			const current = prev[type];
			const newValue = current.map((item) =>
				item.id === id
					? { ...item, priority: !item.priority }
					: item.priority
						? { ...item, priority: false }
						: item,
			);

			return { ...prev, [type]: newValue, canSubmit: true };
		}),
})).create();
