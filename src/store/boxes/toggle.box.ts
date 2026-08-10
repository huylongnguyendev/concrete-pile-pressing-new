import { createBox } from "@lavaz/store";

interface ToggleState {
	menu: boolean;
	search: boolean;
}

const initialState = {
	menu: false,
	search: false,
} satisfies ToggleState as ToggleState;

export const toggleBox = createBox(initialState, (set) => ({
	setOpenMenu: () => set((prev) => ({ ...prev, menu: true })),
	setCloseMenu: () => set((prev) => ({ ...prev, menu: false })),
	setOpenSearch: () => set((prev) => ({ ...prev, search: true })),
	setCloseSearch: () => set((prev) => ({ ...prev, search: false })),
})).create();
