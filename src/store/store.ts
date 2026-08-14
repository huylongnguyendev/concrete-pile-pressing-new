import { createStore } from "@lavaz/store";
import { companyBox } from "./boxes/company.box";
import { toggleBox } from "./boxes/toggle.box";

export const store = createStore({
	toggle: toggleBox,
	company: companyBox,
});
