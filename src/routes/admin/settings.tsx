import { eq, useLiveQuery } from "@tanstack/react-db";
import { ClientOnly, createFileRoute } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldTitle,
} from "#/components/ui/field";
import { Slider } from "#/components/ui/slider";
import { Switch } from "#/components/ui/switch";
import { fontCollection, themeCollection } from "#/lib/utils/ui";
import { Button } from "#/components/ui/button";

export const Route = createFileRoute("/admin/settings")({
	ssr: "data-only",
	component: RouteComponent,
});

function RouteComponent() {
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
	const currentFontPref = font?.[0];

	const currentTheme = currentThemePref?.theme ?? "light";
	const currentFont = currentFontPref?.font || 16;

	const isDark = currentTheme === "dark";

	const toggleTheme = () => {
		const next = currentTheme === "dark" ? "light" : "dark";
		if (currentThemePref)
			themeCollection.update("ui-theme", (darf) => {
				darf.theme = next;
			});
		else themeCollection.insert({ id: "ui-theme", theme: "light" });
	};

	const handleFontChange = (size: number[]) => {
		const next = size[0];

		if (currentFontPref)
			fontCollection.update("ui-font", (darf) => {
				darf.font = next;
			});
		else fontCollection.insert({ id: "ui-font", font: 16 });
	};

	const handleSetFontDefault = () => {
		fontCollection.update("ui-font", (draf) => {
			draf.font = 16;
		});
	};

	return (
		<div className="py-2 space-y-8">
			<h1 className="border-l-4 border-primary pl-2 font-semibold">
				<p className="text-lg md:text-xl">Thiết lập ứng dụng</p>
				<p className="text-muted-foreground text-xs">
					Thiết lập ứng dụng theo cá nhân của bạn
				</p>
			</h1>
			<Card>
				<CardHeader>
					<CardTitle>Hiển thị</CardTitle>
					<CardDescription>Thiết lập hiển thị giao diện</CardDescription>
				</CardHeader>
				<CardContent className="space-y-4">
					<FieldGroup className="w-full">
						<FieldLabel htmlFor="switch-theme">
							<Field orientation="horizontal">
								<FieldContent>
									<FieldTitle>Chế độ ban đêm</FieldTitle>
									<FieldDescription>
										Khi bật chức năng Chế độ ban đêm sẽ chuyển sang nền tối.
									</FieldDescription>
								</FieldContent>
								<ClientOnly>
									<Switch
										id="switch-theme"
										checked={isDark}
										onCheckedChange={toggleTheme}
									/>
								</ClientOnly>
							</Field>
						</FieldLabel>
					</FieldGroup>
					<div className="p-4 flex flex-col gap-4 border rounded-md">
						<div className="text-sm space-y-2">
							<h2 className="font-semibold">Kích thước font</h2>
							<p className="text-muted-foreground">Tùy chỉnh kích thước chữ</p>
						</div>
						<div className="flex flex-col gap-2">
							<p className="inline-block ms-auto w-fit text-muted-foreground text-sm">
								Kích thước hiện tại: {currentFont}
							</p>
							<Slider
								defaultValue={[currentFont]}
								max={20}
								min={12}
								step={1}
								value={[currentFont]}
								onValueChange={handleFontChange}
								className="mx-auto w-full"
							/>
						</div>
						{currentFont !== 16 ? (
							<Button
								variant={"outline"}
								onClick={handleSetFontDefault}
								className="w-fit ms-auto"
								disabled={currentFont === 16}
							>
								Đặt lại mặc định
							</Button>
						) : null}
					</div>
				</CardContent>
			</Card>
		</div>
	);
}
