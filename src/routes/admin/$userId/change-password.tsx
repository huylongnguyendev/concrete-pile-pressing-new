import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { EyeIcon, EyeOffIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Spinner } from "#/components/ui/spinner";
import { changePasswordFn } from "#/db/services/auth.service";
import { type ChangePassword, ChangePasswordSchema } from "#/schema/auth.schema";

export const Route = createFileRoute("/admin/$userId/change-password")({
	component: RouteComponent,
});

function RouteComponent() {
	const [showPassword, setShowPassword] = useState<Record<string, boolean>>({
		password: false,
		newPassword: false,
		confirmPassword: false,
	});
	const navigate = useNavigate();

	const handleShowPassword = (id: keyof typeof showPassword) => {
		setShowPassword((prev) => ({ ...prev, [id]: !prev[id] }));
	};

	const form = useForm({
		defaultValues: {
			password: "",
			newPassword: "",
			confirmPassword: "",
		} as ChangePassword,
		validators: {
			onChange: ChangePasswordSchema,
			onBlur: ChangePasswordSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await changePasswordFn({ data: value });

			if (res.success) {
				toast.success(res.message);
				navigate({ to: "/admin/sign-in" });
			} else {
				if (res.message === "Không thể thay đổi với mật khẩu này!") {
					toast.success(res.message);
					navigate({ to: "/admin/sign-in" });
				} else toast.error(res.message);
			}
		},
	});
	return (
		<div className="h-[calc(100dvh-44.8px)] space-y-8 grid place-items-center">
			<Card className="w-full max-w-5xl">
				<CardHeader>
					<CardTitle className="capitalize font-semibold text-xl text-primary text-center">
						Thay đổi mật khẩu
					</CardTitle>
					<CardDescription className="text-center text-balance max-w-2xl mx-auto">
						Thay đổi mật khẩu hiện tại của bạn sang mật khẩu mới. Sau khi đổi
						mật khẩu thành công bạn cần đăng nhập lại tài khoản của bạn
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
						className="space-y-8"
					>
						<FieldGroup>
							<form.Field name="password">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<FieldLabel htmlFor={name}>Mật khẩu hiện tại</FieldLabel>
										<InputGroup>
											<InputGroupInput
												id={name}
												type={!showPassword[name] ? "password" : "text"}
												placeholder="********"
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<InputGroupAddon align="inline-end">
												<Button
													type="button"
													variant={"ghost"}
													size="icon-sm"
													onClick={() => handleShowPassword(name)}
												>
													{!showPassword[name] ? <EyeOffIcon /> : <EyeIcon />}
												</Button>
											</InputGroupAddon>
										</InputGroup>
										<FieldError className="text-red-400 text-xs mt-1">
											{state.meta.errorMap.onChange
												? state.meta.errorMap.onChange
														.flat()
														.map((i) => i.message)
														.join(", ")
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
												type={!showPassword[name] ? "password" : "text"}
												placeholder="********"
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<InputGroupAddon align="inline-end">
												<Button
													type="button"
													variant={"ghost"}
													size="icon-sm"
													onClick={() => handleShowPassword(name)}
												>
													{!showPassword[name] ? <EyeOffIcon /> : <EyeIcon />}
												</Button>
											</InputGroupAddon>
										</InputGroup>
										<FieldError className="text-red-400 text-xs mt-1">
											{state.meta.errorMap.onChange
												? state.meta.errorMap.onChange
														.flat()
														.map((i) => i.message)
														.join(", ")
												: ""}
										</FieldError>
									</Field>
								)}
							</form.Field>
							<form.Field name="confirmPassword">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<FieldLabel htmlFor={name}>Xác nhận mật khẩu</FieldLabel>
										<InputGroup>
											<InputGroupInput
												id={name}
												type={!showPassword[name] ? "password" : "text"}
												placeholder="********"
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<InputGroupAddon align="inline-end">
												<Button
													type="button"
													variant={"ghost"}
													size="icon-sm"
													onClick={() => handleShowPassword(name)}
												>
													{!showPassword[name] ? <EyeOffIcon /> : <EyeIcon />}
												</Button>
											</InputGroupAddon>
										</InputGroup>
										<FieldError className="text-red-400 text-xs mt-1">
											{state.meta.errorMap.onChange
												? state.meta.errorMap.onChange
														.flat()
														.map((i) => i.message)
														.join(", ")
												: ""}
										</FieldError>
									</Field>
								)}
							</form.Field>
						</FieldGroup>
						<div className="flex justify-end items-center gap-2">
							<Button variant={"secondary"} asChild>
								<Link to="/admin">
									Hủy bỏ
								</Link>
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
											<>
												<SendIcon />
												<span>Đổi mật khẩu</span>
											</>
										)}
									</Button>
								)}
							</form.Subscribe>
						</div>
					</form>
				</CardContent>
			</Card>
		</div>
	);
}
