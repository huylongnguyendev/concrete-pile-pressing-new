import { useForm } from "@tanstack/react-form";
import { EditIcon, EyeIcon, EyeOffIcon, LogOutIcon } from "lucide-react";
import { useState } from "react";
import { LogOutDialog } from "#/components/dialog/LogOutDialog";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { DialogTrigger } from "#/components/ui/dialog";
import { Field, FieldError, FieldLabel, FieldSet } from "#/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Spinner } from "#/components/ui/spinner";
import {
	type ChangePassword,
	ChangePasswordSchema,
} from "#/schema/auth.schema";
import { useAuthChangePassword } from "#/hooks/mutation/use-auth-mutation";
import { toast } from "sonner";
import { useNavigate } from "@tanstack/react-router";

export function AccAuth() {
	const { mutateAsync } = useAuthChangePassword();

	const navigate = useNavigate();
	const [isChangePassword, setIsChangePassword] = useState<boolean>(false);
	const [isShowPassword, setIsShowPassword] = useState<{
		password: boolean;
		newPassword: boolean;
		confirmPassword: boolean;
	}>({ password: false, newPassword: false, confirmPassword: false });

	const form = useForm({
		defaultValues: {
			password: "",
			newPassword: "",
			confirmPassword: "",
		} as ChangePassword,
		validators: {
			onBlur: ChangePasswordSchema,
			onChange: ChangePasswordSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await mutateAsync(value);

			if (res.success) {
				toast.success(res.message);
				setIsChangePassword(false);
			} else {
				toast.error(res.message);
				navigate({ to: "/sign-in", search: { redirect: "/admin" } });
			}
		},
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hoạt động và Bảo mật</CardTitle>
				<CardDescription>
					Các hoạt động và bảo mật Tài khoản của bạn
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Button
					variant={"ghost"}
					className="w-full justify-start"
					onClick={() => setIsChangePassword((prev) => !prev)}
				>
					<EditIcon />
					<span>Thay đổi mật khẩu</span>
				</Button>
				{isChangePassword && (
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="mt-4"
					>
						<FieldSet>
							<form.Field name="password">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<FieldLabel htmlFor={name}>Mật khẩu hiện tại</FieldLabel>
										<InputGroup>
											<InputGroupInput
												id={name}
												type={isShowPassword[name] ? "text" : "password"}
												placeholder="********"
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<InputGroupAddon
												className="cursor-auto"
												align="inline-end"
												onClick={() =>
													setIsShowPassword((prev) => ({
														...prev,
														[name]: !prev[name],
													}))
												}
											>
												{isShowPassword[name] ? <EyeIcon /> : <EyeOffIcon />}
											</InputGroupAddon>
										</InputGroup>
										<FieldError className="italic">
											{state.meta.errorMap.onChange ||
											state.meta.errorMap.onSubmit
												? state.meta.errors?.[0]?.message
												: ""}
										</FieldError>
									</Field>
								)}
							</form.Field>
							<form.Field name="newPassword">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<FieldLabel htmlFor={name}>Mật khẩu mới</FieldLabel>
										<InputGroup>
											<InputGroupInput
												id={name}
												type={isShowPassword[name] ? "text" : "password"}
												placeholder="Nhập mật khẩu mới..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<InputGroupAddon
												className="cursor-auto"
												align="inline-end"
												onClick={() =>
													setIsShowPassword((prev) => ({
														...prev,
														[name]: !prev[name],
													}))
												}
											>
												{isShowPassword[name] ? <EyeIcon /> : <EyeOffIcon />}
											</InputGroupAddon>
										</InputGroup>
										<FieldError className="italic">
											{state.meta.errorMap.onChange ||
											state.meta.errorMap.onSubmit
												? state.meta.errors?.[0]?.message
												: ""}
										</FieldError>
									</Field>
								)}
							</form.Field>
							<form.Field name="confirmPassword">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<FieldLabel htmlFor={name}>
											Xác nhận mật khẩu mới
										</FieldLabel>
										<InputGroup>
											<InputGroupInput
												id={name}
												type={isShowPassword[name] ? "text" : "password"}
												placeholder="Xác nhận mật khẩu..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<InputGroupAddon
												className="cursor-auto"
												align="inline-end"
												onClick={() =>
													setIsShowPassword((prev) => ({
														...prev,
														[name]: !prev[name],
													}))
												}
											>
												{isShowPassword[name] ? <EyeIcon /> : <EyeOffIcon />}
											</InputGroupAddon>
										</InputGroup>
										<FieldError className="italic">
											{state.meta.errorMap.onChange ||
											state.meta.errorMap.onSubmit
												? state.meta.errors?.[0]?.message
												: ""}
										</FieldError>
									</Field>
								)}
							</form.Field>
						</FieldSet>
						<div className="flex justify-end items-center gap-2 mt-4">
							<Button
								type="button"
								variant={"ghost"}
								onClick={() => setIsChangePassword(false)}
							>
								Hủy bỏ
							</Button>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit, isSubmitting]) => (
									<Button type="submit" disabled={!canSubmit}>
										{isSubmitting ? (
											<>
												<Spinner />
												<span>Đang xử lý...</span>
											</>
										) : (
											"Xác nhận"
										)}
									</Button>
								)}
							</form.Subscribe>
						</div>
					</form>
				)}
				<DialogTrigger asChild>
					<Button variant={"ghost"} className="w-full justify-start">
						<LogOutIcon />
						<span>Đăng xuất</span>
					</Button>
				</DialogTrigger>
				<LogOutDialog />
			</CardContent>
		</Card>
	);
}
