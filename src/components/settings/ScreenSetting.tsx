import { eq, useLiveQuery } from "@tanstack/react-db";
import { useEffect, useState } from "react";
import { themeCollection } from "#/lib/theme";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "../ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from "../ui/field";
import { Slider } from "../ui/slider";
import { Switch } from "../ui/switch";

export function ScreenSetting() {
	const [fontSize, setFontSize] = useState<number[]>([16]);

	const { data: prefs } = useLiveQuery((q) =>
		q.from({ pref: themeCollection }).where(({ pref }) => eq(pref.id, "theme")),
	);

	const currentPref = prefs[0];
	const currentTheme = currentPref?.mode ?? "light";
	const isDarkMode = currentTheme === "dark";

	const toggleTheme = () => {
		const next = currentTheme === "dark" ? "light" : "dark";

		if (currentPref) {
			themeCollection.update("theme", (draft) => {
				draft.mode = next;
			});
		} else {
			themeCollection.insert({ id: "theme", mode: next });
		}

		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(next);
	};

	useEffect(() => {
		document.documentElement.classList.remove("dark", "light");
		document.documentElement.classList.add(currentTheme);
	}, [currentTheme]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Màn hình</CardTitle>
				<CardDescription>Thiết lập màn hình, font</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<FieldGroup>
					<FieldLabel htmlFor="switch-theme">
						<Field orientation="horizontal">
							<FieldContent>
								<FieldTitle>Chế độ ban đêm</FieldTitle>
								<FieldDescription>
									Chế độ ban đêm sẽ thay đổi sang màu nền tối, giúp giảm ảnh
									hưởng đến mắt.
								</FieldDescription>
							</FieldContent>
							<Switch
								id="switch-theme"
								checked={isDarkMode}
								onCheckedChange={toggleTheme}
							/>
						</Field>
					</FieldLabel>
				</FieldGroup>
				<div className="p-4 border rounded-md">
					<div className="flex items-center justify-between">
						<div className="space-y-1">
							<h2 className="text-sm font-semibold">Kích thước font</h2>
							<p className="text-muted-foreground text-sm">
								Tùy chỉnh kích thước chữ hiển thị (chỉ áp dụng trong phần quản
								trị).
							</p>
						</div>
						<span className="text-sm font-bold text-primary px-2 py-1 bg-primary/10 dark:bg-primary dark:text-primary-foreground rounded-md">
							{fontSize[0]}px
						</span>
					</div>
					<Slider
						defaultValue={[16]}
						min={12}
						max={20}
						step={1}
						onValueChange={setFontSize}
						className="w-full max-w-xs mt-4"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
