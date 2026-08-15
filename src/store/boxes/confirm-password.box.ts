import { createBox } from "@lavaz/store";

interface ConfirmPasswordState {
	isConfirm: boolean;
}

const initialState = {
	isConfirm: false,
} satisfies ConfirmPasswordState as ConfirmPasswordState;

export const confirmPasswordBox = createBox(initialState, (set) => ({
	setIsConfirm: (value: boolean) =>
		set((prev) => ({ ...prev, isConfirm: value })),
})).create();
