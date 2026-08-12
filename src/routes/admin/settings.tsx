import { createFileRoute } from "@tanstack/react-router";
import { ScreenSetting } from "#/components/settings/ScreenSetting";
import ProtectSetting from "#/components/settings/ProtectSetting";

export const Route = createFileRoute("/admin/settings")({
	component: RouteComponent,
});

function RouteComponent() {
	return (
		<div className="space-y-8">
			<h2 className="text-lg capitalize font-semibold text-primary text-center flex justify-center">
				Thiết lập ứng dụng
			</h2>
			<ScreenSetting />
			<ProtectSetting />
		</div>
	);
}
