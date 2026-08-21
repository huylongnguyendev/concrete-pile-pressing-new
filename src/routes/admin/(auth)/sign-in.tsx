import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Checkbox } from "#/components/ui/checkbox";
import {
	Field,
	FieldError,
	FieldGroup,
	FieldLabel,
} from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { signInFn } from "#/db/services/auth.service";
import { type SignIn, SignInSchema } from "#/schema/auth.schema";

export const Route = createFileRoute("/admin/(auth)/sign-in")({
	staticData: { isShowSidebar: false },
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			identicator: "",
			password: "",
			remember: false,
		} as SignIn,
		validators: {
			onChange: SignInSchema,
			onBlur: SignInSchema,
		},
		onSubmit: async ({ value }) => {
			const result = await signInFn({ data: value });

			if (result.success) {
				toast.success(result.message);
				navigate({ to: "/admin" });
			} else toast.error(result.message);
		},
	});

	return (
		<div className="relative h-dvh w-full grid place-items-center overflow-hidden bg-slate-950 px-4">
			{/* Hiệu ứng nền trang trí */}
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
							Đăng nhập Quản trị
						</CardTitle>
						<CardDescription className="text-slate-400">
							Nhập tài khoản và mật khẩu để truy cập hệ thống
						</CardDescription>
					</CardHeader>

					<CardContent className="space-y-4 pt-2">
						<form.Field name="identicator">
							{({ name, state, handleBlur, handleChange }) => (
								<FieldGroup>
									<Field>
										<FieldLabel htmlFor={name}>
											Tên đăng nhập/Số điện thoại
										</FieldLabel>
										<Input
											id={name}
											type="text"
											placeholder="Tên đăng nhập hoặc Số điện thoại của bạn..."
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
								</FieldGroup>
							)}
						</form.Field>

						<form.Field name="password">
							{({ name, state, handleBlur, handleChange }) => (
								<FieldGroup>
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
								</FieldGroup>
							)}
						</form.Field>

						<form.Field name="remember">
							{({ name, state, handleChange }) => (
								<FieldGroup>
									<Field orientation="horizontal">
										<Checkbox
											id={name}
											checked={state.value}
											onCheckedChange={(e) => handleChange(Boolean(e))}
										/>
										<FieldLabel htmlFor={name}>Ghi nhớ đăng nhập</FieldLabel>
									</Field>
								</FieldGroup>
							)}
						</form.Field>
					</CardContent>
					<CardFooter className="flex-col gap-6">
						<form.Subscribe
							selector={(state) => [state.canSubmit, state.isSubmitting]}
						>
							{([canSubmit, isSubmitting]) => (
								<Button
									type="submit"
									disabled={!canSubmit}
									className="w-full mt-2 font-semibold shadow-lg shadow-primary/20"
								>
									{isSubmitting ? (
										<>
											<Spinner />
											<span>Đang xử lý...</span>
										</>
									) : (
										"Đăng nhập"
									)}
								</Button>
							)}
						</form.Subscribe>

						<div className="text-center text-sm text-slate-400 pt-2">
							Chưa có tài khoản quản trị?{" "}
							<Link
								to="/admin/sign-up"
								className="text-primary font-medium hover:underline"
							>
								Đăng ký ngay
							</Link>
						</div>
					</CardFooter>
				</Card>
			</form>
		</div>
	);
}
