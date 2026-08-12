import { eq, useLiveQuery } from "@tanstack/react-db";
import { useState } from "react";
import { collections } from "#/lib/screen";
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

	const { data } = useLiveQuery((q) =>
		q.from({ pref: collections }).where(({ pref }) => eq(pref.id, "ui")),
	);

	const currentPref = data[0];

	const currentTheme = currentPref?.mode ?? "light";
	const isDarkMode = currentTheme === "dark";

	const toggleTheme = () => {
		const next = currentTheme === "dark" ? "light" : "dark";

		if (currentPref)
			collections.update("ui", (draft) => {
				draft.mode = next;
			});
		else collections.insert({ id: "ui", mode: next, size: fontSize[0] });
	};

	const handleFontSize = (value: number[]) => {
		const nextSize = value[0];

		if (currentPref)
			collections.update("ui", (draft) => {
				draft.size = nextSize;
			});
		else
			collections.insert({
				id: "ui",
				mode: currentTheme,
				size: nextSize,
			});

		setFontSize(value);
	};

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
							{currentPref ? [currentPref.size] : fontSize[0]}px
						</span>
					</div>
					<Slider
						defaultValue={currentPref ? [currentPref.size] : [16]}
						min={12}
						max={20}
						step={1}
						onValueChange={handleFontSize}
						className="w-full max-w-xs mt-4"
					/>
				</div>
			</CardContent>
		</Card>
	);
}
