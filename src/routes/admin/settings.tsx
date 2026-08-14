import { createFileRoute } from "@tanstack/react-router";
import ProtectSetting from "#/components/admin/settings/ProtectSetting";
import { ScreenSetting } from "#/components/admin/settings/ScreenSetting";

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
