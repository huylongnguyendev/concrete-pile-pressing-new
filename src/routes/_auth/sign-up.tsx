import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import {
	ArrowLeftIcon,
	ArrowRightIcon,
	AsteriskIcon,
	EyeIcon,
	EyeOffIcon,
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel, FieldSet } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Spinner } from "#/components/ui/spinner";
import { useAuthSignUpMutation } from "#/hooks/mutation/use-auth-mutation";
import { type SignUp, SignUpSchema } from "#/schema/auth.schema";

export const Route = createFileRoute("/_auth/sign-up")({
	staticData: { isShowNav: false, isShowSidebar: false },
	component: RouteComponent,
});

function RouteComponent() {
	const { mutateAsync } = useAuthSignUpMutation();
	const navigate = useNavigate();
	const [step, setStep] = useState<number>(1);
	const [isShow, setIsShow] = useState<{ password: boolean; confirm: boolean }>(
		{ password: false, confirm: false },
	);
	const form = useForm({
		defaultValues: {
			fullName: "",
			confirmPassword: "",
			password: "",
			phoneNumber: "",
			username: "",
			code: "",
			email: "",
		} as SignUp,
		validators: { onBlur: SignUpSchema, onChange: SignUpSchema },
		onSubmit: async ({ value }) => {
			const res = await mutateAsync(value);
			if (res.success) {
				toast.success(res.message);
				navigate({ to: "/sign-in", search: { redirect: "/admin" } });
			} else toast.error(res.message);
		},
	});

	return (
		<div className="relative w-full h-dvh bg-background backdrop-blur-2xl z-10 flex flex-col items-center justify-center px-4">
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] -z-20 pointer-events-none" />
			<div className="absolute size-112.5 bg-primary/20 rounded-full blur-[130px] -z-10 top-1/4 left-1/3 -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
			<div className="absolute size-87.5 bg-blue-600/10 rounded-full blur-[100px] -z-10 bottom-1/4 right-1/3 translate-x-1/2 translate-y-1/2 pointer-events-none" />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="w-full max-w-md bg-card p-4 rounded-md shadow-md space-y-6"
			>
				<div className="border-l-4 border-primary pl-2">
					<h1 className="text-xl font-semibold">Đăng ký</h1>
					<p className="text-muted-foreground text-sm">
						Đăng ký vào tài khoản mới
					</p>
				</div>
				{step === 1 ? (
					<div>
						<FieldSet>
							<form.Field name="username">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name}>Tên đăng nhập</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="text"
												placeholder="Nhập tên tài khoản mới..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
							<form.Field name="password">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name} className="relative">
												Mật khẩu
											</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<InputGroup>
												<InputGroupInput
													id={name}
													type={isShow.password ? "text" : "password"}
													placeholder="Nhập mật khẩu của bạn..."
													value={state.value}
													onBlur={handleBlur}
													onChange={(e) => handleChange(e.target.value)}
												/>
												<InputGroupAddon
													align="inline-end"
													onClick={() =>
														setIsShow((prev) => ({
															...prev,
															password: !prev.password,
														}))
													}
													className="cursor-pointer"
												>
													{isShow.password ? <EyeIcon /> : <EyeOffIcon />}
												</InputGroupAddon>
											</InputGroup>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
							<form.Field name="confirmPassword">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name} className="relative">
												Xác nhận mật khẩu
											</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<InputGroup>
												<InputGroupInput
													id={name}
													type={isShow.confirm ? "text" : "password"}
													placeholder="Xác nhận mật khẩu của bạn..."
													value={state.value}
													onBlur={handleBlur}
													onChange={(e) => handleChange(e.target.value)}
												/>
												<InputGroupAddon
													align="inline-end"
													onClick={() =>
														setIsShow((prev) => ({
															...prev,
															confirm: !prev.confirm,
														}))
													}
													className="cursor-pointer"
												>
													{isShow.confirm ? <EyeIcon /> : <EyeOffIcon />}
												</InputGroupAddon>
											</InputGroup>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
						</FieldSet>
						<Button
							type="button"
							className="mt-8 w-full"
							onClick={() => setStep(2)}
						>
							<span>Bước tiếp theo</span>
							<ArrowRightIcon />
						</Button>
					</div>
				) : (
					<div>
						<FieldSet>
							<form.Field name="fullName">
								{({ name, handleBlur, handleChange, state }) => (
									<Field>
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name}>Họ và Tên</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="text"
												placeholder="Nguyễn Văn A..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
							<form.Field name="phoneNumber">
								{({ name, handleBlur, handleChange, state }) => (
									<Field>
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name}>Số điện thoại</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="tel"
												placeholder="Số điện thoại của bạn..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
							<form.Field name="email">
								{({ name, handleBlur, handleChange, state }) => (
									<Field>
										<FieldLabel htmlFor={name}>Email</FieldLabel>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="email"
												placeholder="Email của bạn..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
							<form.Field name="code">
								{({ name, handleBlur, handleChange, state }) => (
									<Field>
										<FieldLabel htmlFor={name}>Mã Code</FieldLabel>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="text"
												placeholder="Mã code..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
						</FieldSet>
						<div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-8">
							<Button
								type="button"
								variant={"outline"}
								onClick={() => setStep(1)}
							>
								<ArrowLeftIcon />
								<span>Quay lại</span>
							</Button>
							<form.Subscribe
								selector={(state) => [state.canSubmit, state.isSubmitting]}
							>
								{([canSubmit, isSubmitting]) => (
									<Button
										type="submit"
										disabled={!canSubmit}
										className="w-full"
									>
										{isSubmitting ? (
											<>
												<Spinner />
												<span>Đang xử lý...</span>
											</>
										) : (
											<span>Đăng ký</span>
										)}
									</Button>
								)}
							</form.Subscribe>
						</div>
					</div>
				)}
				<p className="text-sm text-center">
					Bạn đã có tài khoản?{" "}
					<Link
						to="/sign-in"
						search={{ redirect: "/admin" }}
						className="text-primary"
					>
						Đăng nhập tại đây
					</Link>
				</p>
			</form>
		</div>
	);
}
