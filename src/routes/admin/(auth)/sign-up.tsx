import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { signUpFn } from "#/db/services/auth.service";
import { type SignUp, SignUpSchema } from "#/schema/auth.schema";

export const Route = createFileRoute("/admin/(auth)/sign-up")({
	staticData: { isShowSidebar: false },
	component: RouteComponent,
});

function RouteComponent() {
	const [step, setStep] = useState(1);

	const form = useForm({
		defaultValues: {
			fullName: "",
			password: "",
			phoneNumber: "",
			username: "",
			code: "",
			email: "",
			confirmPassword: "",
		} as SignUp,
		validators: {
			onChange: SignUpSchema,
			onBlur: SignUpSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await signUpFn({ data: value });

			if (res.success) toast.success(res.message);
			else toast.error(res.message);
		},
	});

	return (
		<div className="relative h-dvh w-full grid place-items-center overflow-hidden bg-slate-950 px-4">
			{/* Hiệu ứng nền trang trí bắt mắt (Background Glow & Grid Pattern) */}
			<div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-size-[4rem_4rem] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30 pointer-events-none" />
			<div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/20 rounded-full blur-3xl pointer-events-none" />

			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="relative z-10 w-full max-w-md"
			>
				<Card className="border-slate-800 bg-slate-900/80 backdrop-blur-xl shadow-2xl text-slate-100">
					<CardHeader className="space-y-1 text-center">
						<CardTitle className="text-2xl font-bold tracking-tight text-primary">
							Đăng ký Tài khoản
						</CardTitle>
						<CardDescription className="text-slate-400">
							{step === 1
								? "Bước 1: Nhập thông tin cá nhân cơ bản"
								: "Bước 2: Thiết lập bảo mật & hoàn tất"}
						</CardDescription>

						{/* Thanh tiến trình (Step Progress Bar) */}
						<div className="flex gap-2 w-full pt-3">
							<div
								className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 1 ? "bg-primary" : "bg-slate-800"}`}
							/>
							<div
								className={`h-1.5 flex-1 rounded-full transition-colors ${step >= 2 ? "bg-primary" : "bg-slate-800"}`}
							/>
						</div>
					</CardHeader>

					<CardContent className="space-y-4 pt-2">
						{/* --- BƯỚC 1: THÔNG TIN CÁ NHÂN --- */}
						{step === 1 && (
							<div className="space-y-3 animate-in fade-in-50 duration-300">
								<form.Field name="username">
									{({ name, state, handleBlur, handleChange }) => (
										<Field>
											<FieldLabel htmlFor={name}>Tên đăng nhập</FieldLabel>
											<Input
												id={name}
												type="text"
												placeholder="Tên đăng nhập mới..."
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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

								<form.Field name="fullName">
									{({ name, state, handleBlur, handleChange }) => (
										<Field>
											<FieldLabel htmlFor={name}>Họ và tên</FieldLabel>
											<Input
												id={name}
												type="text"
												placeholder="Nguyễn Văn A..."
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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

								<form.Field name="phoneNumber">
									{({ name, state, handleBlur, handleChange }) => (
										<Field>
											<FieldLabel htmlFor={name}>Số điện thoại</FieldLabel>
											<Input
												id={name}
												type="tel"
												placeholder="Số điện thoại của bạn..."
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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

								<form.Field name="email">
									{({ name, state, handleBlur, handleChange }) => (
										<Field>
											<FieldLabel htmlFor={name}>
												Địa chỉ email{" "}
												<span className="text-slate-500 font-normal">
													(không bắt buộc)
												</span>
											</FieldLabel>
											<Input
												id={name}
												type="email"
												placeholder="Email của bạn..."
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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
							</div>
						)}

						{/* --- BƯỚC 2: MẬT KHẨU & MÃ CODE --- */}
						{step === 2 && (
							<div className="space-y-3 animate-in fade-in-50 duration-300">
								<form.Field name="password">
									{({ name, state, handleBlur, handleChange }) => (
										<Field>
											<FieldLabel htmlFor={name}>Mật khẩu</FieldLabel>
											<Input
												id={name}
												type="password"
												placeholder="********"
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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
											<Input
												id={name}
												type="password"
												placeholder="********"
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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

								<form.Field name="code">
									{({ name, state, handleBlur, handleChange }) => (
										<Field>
											<FieldLabel htmlFor={name}>
												Mã code{" "}
												<span className="text-slate-500 font-normal">
													(không bắt buộc)
												</span>
											</FieldLabel>
											<Input
												id={name}
												type="text"
												placeholder="Mã code xác thực..."
												value={state.value}
												onChange={(e) => handleChange(e.target.value)}
												onBlur={handleBlur}
											/>
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
							</div>
						)}
					</CardContent>
					<CardFooter className="flex-col">
						<CardAction className="flex justify-between gap-2 w-full">
							{step === 1 ? (
								<Button
									type="button"
									onClick={() => setStep(2)}
									className="w-full mt-2 font-semibold shadow-lg shadow-primary/20"
								>
									Tiếp tục
								</Button>
							) : (
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
								>
									{([canSubmit, isSubmitting]) => (
										<>
											<Button
												type="button"
												variant="secondary"
												disabled={isSubmitting}
												onClick={() => setStep(1)}
												className="w-1/2"
											>
												Quay lại
											</Button>
											<Button
												type="submit"
												disabled={!canSubmit}
												className="w-1/2"
											>
												{isSubmitting ? (
													<>
														<Spinner />
														<span>Đang xử lý...</span>
													</>
												) : (
													"Đăng ký"
												)}
											</Button>
										</>
									)}
								</form.Subscribe>
							)}
						</CardAction>
						<div className="text-center text-sm text-slate-400 pt-2 mt-6">
							Đã có tài khoản?{" "}
							<Link
								to="/admin/sign-in"
								className="text-primary font-medium hover:underline"
							>
								Đăng nhập ngay
							</Link>
						</div>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
