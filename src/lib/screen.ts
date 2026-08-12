import {
	createCollection,
	localStorageCollectionOptions,
} from "@tanstack/react-db";

interface UIPreference {
	id: string;
	mode: "light" | "dark";
	size: number;
}

const collections = createCollection<UIPreference, string>(
	localStorageCollectionOptions({
		id: "ui-pref",
		storageKey: "app-ui",
		getKey: (item) => item.id,
	}),
);

export { collections, type UIPreference };
