import z from "zod";

const ChangePasswordSchema = z
	.object({
		password: z
			.string()
			.min(1, { message: "Vui lòng nhập mật khẩu hiện tại!" }),
		newPassword: z
			.string()
			.min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự!" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
				message:
					"Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số!",
			}),
		confirmPassword: z.string(),
	})
	.refine((value) => value.confirmPassword === value.newPassword, {
		message: "Xác nhận mật khẩu không khớp!",
		path: ["confirmPassword"],
	})
	.refine((value) => value.password !== value.newPassword, {
		message: "Mật khẩu mới không được trùng với mật khẩu cũ!",
		path: ["newPassword"],
	});

type ChangePassword = z.infer<typeof ChangePasswordSchema>;

export { type ChangePassword, ChangePasswordSchema };
