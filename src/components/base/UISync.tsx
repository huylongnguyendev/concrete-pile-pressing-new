import { eq, useLiveQuery } from "@tanstack/react-db";
import { useEffect } from "react";
import { fontCollection, themeCollection } from "#/lib/utils/ui";

export function UISync() {
	const { data: theme } = useLiveQuery((q) =>
		q
			.from({ pref: themeCollection })
			.where(({ pref }) => eq(pref.id, "ui-theme")),
	);

	const { data: font } = useLiveQuery((q) =>
		q
			.from({ pref: fontCollection })
			.where(({ pref }) => eq(pref.id, "ui-font")),
	);

	const currentThemePref = theme?.[0];
	const currentFontRef = font?.[0];

	const currentTheme = currentThemePref?.theme || "light";
	const currentFont = currentFontRef?.font || 16;

	useEffect(() => {
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(currentTheme);
	}, [currentTheme]);

	useEffect(() => {
		document.documentElement.style.setProperty(
			"--base-font-size",
			`${currentFont}px`,
		);
	}, [currentFont]);

	return null;
}
