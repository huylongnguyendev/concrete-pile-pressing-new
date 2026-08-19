import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
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
import { Spinner } from "#/components/ui/spinner";
import { useCreateCustomer } from "#/hooks/query/use-customer-query";
import { type CreateCustomer, CustomerSchema } from "#/schema/customer.schema";

export const Route = createFileRoute("/admin/customers/create-customer")({
	component: RouteComponent,
});

function RouteComponent() {
	const { mutate, isPending, data } = useCreateCustomer();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			fullName: "",
			location: "",
			phoneNumber: "",
		} as CreateCustomer,
		validators: {
			onBlur: CustomerSchema,
			onChange: CustomerSchema,
		},
		onSubmit: ({ value }) => {
			mutate(value);
		},
	});

	if (data?.success) {
		toast.success(data.message);
		navigate({ to: "/admin/customers" });
	}

	if (data && !data.success) toast.error(data.message);

	return (
		<div className="min-h-screen bg-background p-6 md:p-10">
			<div className="mx-auto max-w-2xl space-y-6">
				{/* Nút quay lại */}
				<Button
					variant="ghost"
					size="sm"
					onClick={() => navigate({ to: "/admin/customers" })}
					className="group gap-2 text-muted-foreground hover:text-foreground"
				>
					<ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
					Quay lại danh sách
				</Button>

				{/* Card chứa form */}
				<Card className="border-border/60 shadow-xl">
					<CardHeader>
						<CardTitle className="text-xl">Thêm khách hàng mới</CardTitle>
						<CardDescription>
							Nhập thông tin chi tiết để tạo hồ sơ khách hàng trên hệ thống.
						</CardDescription>
					</CardHeader>

					<CardContent className="pt-6">
						<form
							onSubmit={(e) => {
								e.preventDefault();
								e.stopPropagation();
								form.handleSubmit();
							}}
							className="space-y-6"
						>
							{/* Field: Full Name */}
							<form.Field name="fullName">
								{(field) => {
									return (
										<Field className="space-y-2">
											<FieldLabel htmlFor={field.name}>
												Họ và tên <span className="text-destructive">*</span>
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Ví dụ: Nguyễn Văn A"
											/>
											<FieldError className="text-red-400 text-xs mt-1">
												{field.state.meta.errorMap.onChange
													? field.state.meta.errorMap.onChange
															.flat()
															.map((i) => i.message)
															.join(", ")
													: ""}
											</FieldError>
										</Field>
									);
								}}
							</form.Field>

							{/* Field: Phone Number */}
							<form.Field name="phoneNumber">
								{(field) => {
									return (
										<Field className="space-y-2">
											<FieldLabel htmlFor={field.name}>
												Số điện thoại{" "}
												<span className="text-destructive">*</span>
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Ví dụ: 0912345678"
											/>
											<FieldError className="text-red-400 text-xs mt-1">
												{field.state.meta.errorMap.onChange
													? field.state.meta.errorMap.onChange
															.flat()
															.map((i) => i.message)
															.join(", ")
													: ""}
											</FieldError>
										</Field>
									);
								}}
							</form.Field>

							{/* Field: Location */}
							<form.Field name="location">
								{(field) => {
									return (
										<Field className="space-y-2">
											<FieldLabel htmlFor={field.name}>
												Địa chỉ / Khu vực{" "}
												<span className="text-destructive">*</span>
											</FieldLabel>
											<Input
												id={field.name}
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Ví dụ: Quận 1, TP. Hồ Chí Minh"
											/>
											<FieldError className="text-red-400 text-xs mt-1">
												{field.state.meta.errorMap.onChange
													? field.state.meta.errorMap.onChange
															.flat()
															.map((i) => i.message)
															.join(", ")
													: ""}
											</FieldError>
										</Field>
									);
								}}
							</form.Field>

							{/* Actions Footer */}
							<div className="flex items-center justify-end gap-3 pt-4 border-t border-border/40">
								<Button
									type="button"
									variant="outline"
									onClick={() => navigate({ to: "/admin/customers" })}
								>
									Hủy bỏ
								</Button>
								<form.Subscribe
									selector={(state) => [state.canSubmit, state.isSubmitting]}
								>
									{([canSubmit, isSubmitting]) => (
										<Button type="submit" disabled={!canSubmit}>
											{isSubmitting || isPending ? (
												<>
													<Spinner />
													<span>Đang xử lý...</span>
												</>
											) : (
												"Tạo khách hàng"
											)}
										</Button>
									)}
								</form.Subscribe>
							</div>
						</form>
					</CardContent>
				</Card>
			</div>
		</div>
	);
}
