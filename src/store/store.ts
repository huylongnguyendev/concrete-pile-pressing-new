import { createStore } from "@lavaz/store";
import { companyBox } from "./boxes/company.box";
import { companyInputBox } from "./boxes/company-input.box";
import { confirmPasswordBox } from "./boxes/confirm-password.box";
import { toggleBox } from "./boxes/toggle.box";

export const store = createStore({
	toggle: toggleBox,
	company: companyBox,
	companyInput: companyInputBox,
	confirmPassword: confirmPasswordBox,
});
