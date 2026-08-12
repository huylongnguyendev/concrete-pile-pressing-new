import {
	createCollection,
	localStorageCollectionOptions,
} from "@tanstack/react-db";

interface FontPreference {
	id: string;
	mode: "light" | "dark";
}

const fontCollection = createCollection<FontPreference, string>(
	localStorageCollectionOptions({
		id: "font-pref",
		storageKey: "app-font-size",
		getKey: (item) => item.id,
	}),
);

export { fontCollection };
