import { useForm } from "@tanstack/react-form";
import { EditIcon, TriangleAlertIcon } from "lucide-react";
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
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Separator } from "#/components/ui/separator";
import { Spinner } from "#/components/ui/spinner";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { useUserMutation } from "#/hooks/mutation/use-user-mutation";
import { cn } from "#/lib/utils";
import { UserSchema, type UserUpdate } from "#/schema/user.schema";
import type { TimeApi } from "#/types/base-api.type";
import type { User } from "#/types/user.type";

export function AccInfo({ user }: { user: User & TimeApi }) {
	const { mutateAsync } = useUserMutation();
	const [isEdit, setIsEdit] = useState<boolean>(false);

	const { phoneNumber, username, email, fullName } = user;

	const form = useForm({
		defaultValues: {
			fullName,
			email,
			phoneNumber,
		} as UserUpdate,
		validators: {
			onBlur: UserSchema,
			onChange: UserSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await mutateAsync(value);
			if (res.success) {
				toast.success(res.message);
				setIsEdit(false);
			} else toast.error(res.message);
		},
	});

	return (
		<Card>
			<CardHeader className="flex justify-between">
				<div className="space-y-1">
					<CardTitle>Thông tin tài khoản</CardTitle>
					<CardDescription>Thông tin Tài khoản cá nhân của bạn</CardDescription>
				</div>
				<Button
					variant={"ghost"}
					size={"icon"}
					onClick={() => setIsEdit((prev) => !prev)}
				>
					<EditIcon />
				</Button>
			</CardHeader>
			<CardContent>
				{isEdit ? (
					<form
						className="space-y-6"
						onSubmit={(e) => {
							e.preventDefault();
							e.stopPropagation();
							form.handleSubmit();
						}}
					>
						<form.Field name="fullName">
							{({ name, state, handleBlur, handleChange }) => (
								<Field>
									<FieldLabel className="font-semibold">
										Tên hiển thị:
									</FieldLabel>
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
							{({ name, state, handleBlur, handleChange }) => (
								<Field>
									<FieldLabel className="font-semibold">
										Số điện thoại:
									</FieldLabel>
									<div className="space-y-0.5">
										<Input
											id={name}
											type="text"
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
							{({ name, state, handleBlur, handleChange }) => (
								<Field>
									<FieldLabel className="font-semibold">Email:</FieldLabel>
									<div className="space-y-0.5">
										<Input
											id={name}
											type="email"
											placeholder="Địa chỉ email của bạn..."
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
						<div className="flex justify-end items-center gap-4">
							<Button
								variant={"secondary"}
								type="reset"
								onClick={() => {
									form.reset();
									setIsEdit(false);
								}}
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
						<Separator />
					</form>
				) : (
					<div className="space-y-6">
						<div className="flex items-center gap-1">
							<p className="font-semibold">Tên hiển thị:</p>
							<p>{fullName}</p>
						</div>
						<div className="flex items-center gap-1">
							<p className="font-semibold">Số điện thoại:</p>
							<p>{phoneNumber}</p>
						</div>
						<div className="flex items-center gap-1">
							<p className="font-semibold">Email:</p>
							<p
								className={cn(
									"flex items-center gap-4",
									!email && "italic text-muted-foreground font-semibold",
								)}
							>
								<span>{email || "Chưa có thông tin"}</span>
								{!email && (
									<Tooltip>
										<TooltipTrigger>
											<TriangleAlertIcon className="size-4 text-amber-600" />
										</TooltipTrigger>
										<TooltipContent>
											Chưa có địa chỉ email, hãy thêm địa chỉ email.
										</TooltipContent>
									</Tooltip>
								)}
							</p>
						</div>
					</div>
				)}
			</CardContent>
		</Card>
	);
}
