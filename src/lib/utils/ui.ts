import {
	createCollection,
	localStorageCollectionOptions,
} from "@tanstack/react-db";

interface ThemePreference {
	id: string;
	theme: "light" | "dark";
}

interface FontPreference {
	id: string;
	font: number;
}

const themeCollection = createCollection<ThemePreference, string>(
	localStorageCollectionOptions({
		id: "ui-theme-pref",
		storageKey: "app-ui-theme-pref",
		getKey: (item) => item.id,
	}),
);

const fontCollection = createCollection<FontPreference, string>(
	localStorageCollectionOptions({
		id: "ui-font-pref",
		storageKey: "app-ui-font-pref",
		getKey: (item) => item.id,
	}),
);

export { themeCollection, fontCollection };
