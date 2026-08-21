import { useForm } from "@tanstack/react-form";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { SendIcon } from "lucide-react";
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
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { editUserFn } from "#/db/services/user.service";
import { type UserChange, UserSchema } from "#/schema/user.schema";

export const Route = createFileRoute("/admin/$userId/edit")({
	component: RouteComponent,
});

function RouteComponent() {
	const navigate = useNavigate();
	const form = useForm({
		defaultValues: {
			phoneNumber: "",
			email: "",
			fullName: "",
		} as UserChange,
		validators: {
			onBlur: UserSchema,
			onChange: UserSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await editUserFn({
				data: {
					email: value.email || undefined,
					fullName: value.fullName || undefined,
					phoneNumber: value.phoneNumber || undefined,
				},
			});

			if (res.success) {
				toast.success(res.message);
				navigate({ to: "/admin" });
			} else toast.error(res.message);
		},
	});

	return (
		<div className="h-[calc(100dvh-44.8px)] space-y-8 grid place-items-center">
			<Card className="w-full max-w-5xl">
				<CardHeader>
					<CardTitle className="text-primary text-xl font-semibold capitalize text-center">
						Thay đổi thông tin tài khoản
					</CardTitle>
					<CardDescription className="text-center text-balance max-w-2xl mx-auto">
						Thay đổi thông tin cá nhân tài khoản của bạn
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
							<form.Field name="fullName">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										<FieldLabel>Họ và tên</FieldLabel>
										<Input
											id={name}
											type={"text"}
											placeholder="Nguyễn Văn A..."
											value={state.value}
											onBlur={handleBlur}
											onChange={(e) => handleChange(e.target.value)}
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
										<FieldLabel>Số điện thoại</FieldLabel>
										<Input
											id={name}
											type={"tel"}
											placeholder="Số điện thoại của bạn..."
											value={state.value}
											onBlur={handleBlur}
											onChange={(e) => handleChange(e.target.value)}
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
										<FieldLabel>Địa chỉ Email</FieldLabel>
										<Input
											id={name}
											type={"email"}
											placeholder="example@gmail.com..."
											value={state.value}
											onBlur={handleBlur}
											onChange={(e) => handleChange(e.target.value)}
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
						</FieldGroup>
						<div className="flex justify-end items-center gap-2">
							<Button variant={"secondary"} asChild>
								<Link to="/admin">Hủy bỏ</Link>
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
												<span>Xác nhận</span>
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
