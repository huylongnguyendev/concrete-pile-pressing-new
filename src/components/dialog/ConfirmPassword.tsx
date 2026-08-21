import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import {
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import { confirmPasswordFn } from "#/db/services/auth.service";
import { ConfirmSchema, type ConfirmType } from "#/schema/auth.schema";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { useAppStore } from "@lavaz/store";
import { store } from "#/store/store";

export function ConfirmPassword() {
	const [, { setIsConfirm }] = useAppStore(
		store.confirmPassword,
		(s) => s.isConfirm,
	);
	const form = useForm({
		defaultValues: { password: "" } as ConfirmType,
		validators: {
			onBlur: ConfirmSchema,
			onChange: ConfirmSchema,
		},
		onSubmit: async ({ value }) => {
			try {
				const res = await confirmPasswordFn({ data: value });
				if (res?.success) {
					toast.success(res.message);
					setIsConfirm(true);
				} else toast.error(res?.message || "Xác nhận thất bại");
			} catch (error) {
				toast.error(
					error instanceof Error ? error.message : "Đã có lỗi xảy ra!",
				);
			}
		},
	});

	return (
		<DialogContent>
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="grid gap-4"
			>
				<DialogHeader>
					<DialogTitle>Xác nhận mật khẩu</DialogTitle>
					<DialogDescription>Xác minh để tiếp tục thực hiện</DialogDescription>
				</DialogHeader>
				<form.Field name="password">
					{({ name, state, handleBlur, handleChange }) => (
						<Field>
							<FieldLabel htmlFor={name}>Nhập mật khẩu của bạn</FieldLabel>
							<Input
								id={name}
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
				<DialogFooter>
					<DialogClose asChild>
						<Button type="button" variant={"secondary"}>
							Hủy bỏ
						</Button>
					</DialogClose>
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
									<span>Xác nhận</span>
								)}
							</Button>
						)}
					</form.Subscribe>
				</DialogFooter>
			</form>
		</DialogContent>
	);
}
