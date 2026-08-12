import { Button } from "#/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
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
import { Input } from "../ui/input";
import { Switch } from "../ui/switch";

export default function ProtectSetting() {

	return (
		<Card>
			<CardHeader>
				<CardTitle>Bảo mật</CardTitle>
				<CardDescription>Bảo mật ứng dụng</CardDescription>
			</CardHeader>
			<CardContent className="space-y-4">
				<FieldGroup>
					<FieldLabel htmlFor="switch-protect">
						<Field orientation="horizontal">
							<FieldContent>
								<FieldTitle>Chế độ khóa ứng dụng</FieldTitle>
								<FieldDescription>
									Khi bật chế độ khóa ứng dụng, mọi thao tác sẽ cần xác nhận mật
									khẩu trước khi yêu cầu được thực hiện. Điều này giúp tăng bảo
									mật dữ liệu trên thiết bị của bạn.
								</FieldDescription>
							</FieldContent>
							<Switch id="switch-protect" />
						</Field>
					</FieldLabel>
				</FieldGroup>
				<FieldGroup>
					<Field>
						<FieldLabel>Mật khẩu</FieldLabel>
						<Input type="password" placeholder="********" />
					</Field>
					<Field>
						<FieldLabel>Xác nhận mật khẩu</FieldLabel>
						<Input type="password" placeholder="********" />
					</Field>
				</FieldGroup>
			</CardContent>
			<CardFooter>
				<CardAction className="flex justify-end items-center gap-2 w-full">
					<Button variant={"secondary"}>Hủy bỏ</Button>
					<Button>Xác nhận</Button>
				</CardAction>
			</CardFooter>
		</Card>
	);
}
