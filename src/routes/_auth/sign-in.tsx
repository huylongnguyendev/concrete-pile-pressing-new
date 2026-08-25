import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useRouter } from "@tanstack/react-router";
import { AsteriskIcon, EyeIcon, EyeOffIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { Button } from "#/components/ui/button";
import { Checkbox } from "#/components/ui/checkbox";
import { Field, FieldError, FieldLabel, FieldSet } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Spinner } from "#/components/ui/spinner";
import { useAuthSignInMutation } from "#/hooks/mutation/use-auth-mutation";
import { type SignIn, SignInSchema } from "#/schema/auth.schema";

export const Route = createFileRoute("/_auth/sign-in")({
	staticData: { isShowNav: false, isShowSidebar: false },
	validateSearch: (search) => ({
		redirect: (search.redirect as string) || "/admin",
	}),
	component: RouteComponent,
});

function RouteComponent() {
	const router = useRouter();
	const { redirect } = Route.useSearch();
	const { mutateAsync } = useAuthSignInMutation();
	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);
	const form = useForm({
		defaultValues: {
			identicator: "",
			password: "",
			remember: false,
		} as SignIn,
		validators: { onBlur: SignInSchema, onChange: SignInSchema },
		onSubmit: async ({ value }) => {
			const res = await mutateAsync(value);
			if (res.success) {
				toast.success(res.message);
				router.history.push(redirect);
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
					<h1 className="text-xl font-semibold">Đăng nhập</h1>
					<p className="text-muted-foreground text-sm">
						Đăng nhập vào tài khoản của bạn
					</p>
				</div>
				<FieldSet>
					<form.Field name="identicator">
						{({ name, state, handleBlur, handleChange }) => (
							<Field>
								<div className="flex -gap-2">
									<FieldLabel htmlFor={name}>
										Tên đăng nhập/Số điện thoại
									</FieldLabel>
									<AsteriskIcon className="size-3 text-destructive" />
								</div>
								<div className="space-y-0.5">
									<Input
										id={name}
										type="text"
										placeholder="Nhập tên tài khoản/số điện thoại của bạn..."
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
											type={isShowPassword ? "text" : "password"}
											placeholder="Nhập mật khẩu của bạn..."
											value={state.value}
											onBlur={handleBlur}
											onChange={(e) => handleChange(e.target.value)}
										/>
										<InputGroupAddon
											align="inline-end"
											onClick={() => setIsShowPassword((prev) => !prev)}
											className="cursor-pointer"
										>
											{isShowPassword ? <EyeIcon /> : <EyeOffIcon />}
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
					<div className="flex justify-between items-center">
						<form.Field name="remember">
							{({ name, state, handleChange }) => (
								<Field orientation={"horizontal"} className="gap-2 w-fit">
									<Checkbox
										id={name}
										checked={state.value}
										onCheckedChange={(value) => handleChange(Boolean(value))}
									/>
									<FieldLabel htmlFor={name}>Ghi nhớ đăng nhập</FieldLabel>
								</Field>
							)}
						</form.Field>
						<Link
							to="/admin/reset"
							className="text-sm text-muted-foreground hover:text-primary transition-colors duration-300"
						>
							Quên mật khẩu?
						</Link>
					</div>
				</FieldSet>
				<form.Subscribe
					selector={(state) => [state.canSubmit, state.isSubmitting]}
				>
					{([canSubmit, isSubmitting]) => (
						<Button type="submit" disabled={!canSubmit} className="w-full">
							{isSubmitting ? (
								<>
									<Spinner />
									<span>Đang xử lý...</span>
								</>
							) : (
								<span>Đăng nhập</span>
							)}
						</Button>
					)}
				</form.Subscribe>
				<p className="text-sm text-center">
					Bạn chưa có tài khoản?{" "}
					<Link to="/sign-up" className="text-primary">
						Đăng ký tại đây
					</Link>
				</p>
			</form>
		</div>
	);
}
