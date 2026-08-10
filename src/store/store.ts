import { createStore } from "@lavaz/store";
import { toggleBox } from "./boxes/toggle.box";

export const store = createStore({
	toggle: toggleBox,
});
