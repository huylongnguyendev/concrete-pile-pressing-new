import { createBox } from "@lavaz/store";
import type { Company } from "#/types/company.type";

interface CompanyState extends Company {}

const initialState = {
	addresses: [],
	phoneNumber: [],
	emails: [],
	id: "",
} satisfies CompanyState as CompanyState;

export const companyBox = createBox(initialState, (set) => ({
	setInfo: (info: CompanyState) => set((prev) => ({ ...prev, ...info })),
})).create();

