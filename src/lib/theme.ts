import {
	createCollection,
	localStorageCollectionOptions,
} from "@tanstack/react-db";

interface ThemePreference {
	id: string;
	mode: "light" | "dark";
}

const themeCollection = createCollection<ThemePreference, string>(
	localStorageCollectionOptions({
		id: "theme-prefs",
		storageKey: "app-theme",
		getKey: (item) => item.id,
	}),
);

export { themeCollection };
