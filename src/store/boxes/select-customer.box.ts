import { createBox } from "@lavaz/store";

interface SelectCustomerState {
	isSelectAll: boolean;
	ids: string[];
}

const initialState = {
	ids: [],
	isSelectAll: false,
} satisfies SelectCustomerState as SelectCustomerState;

export const selectCustomerBox = createBox(initialState, (set) => ({
	setIsSelectAll: (value: boolean) =>
		set((prev) => ({ ...prev, isSelectAll: value })),
	setSelect: (id: string) =>
		set((prev) => {
			const existing = prev.ids.find((item) => item === id);
			if (!existing) return { ...prev, ids: [...prev.ids, id] };
			const newValue = prev.ids.filter((item) => item !== existing);
			return { ...prev, ids: newValue };
		}),
	setSelectAll: (ids: string[]) => set((prev) => ({ ...prev, ids })),
})).create();
