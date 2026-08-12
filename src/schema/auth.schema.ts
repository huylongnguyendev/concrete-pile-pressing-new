import { z } from "zod";

const SignUpSchema = z
	.object({
		username: z
			.string()
			.min(5, { message: "Tên tài khoản phải có ít nhất 5 ký tự!" }),
		fullName: z.string().min(3, { message: "Họ tên phải có ít nhất 3 ký tự!" }),
		phoneNumber: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
			message: "Số điện thoại không hợp lệ!",
		}),
		email: z
			.string()
			.email({ message: "Email không hợp lệ!" })
			.optional()
			.or(z.literal("")),
		password: z
			.string()
			.min(8, { message: "Mật khẩu phải có ít nhất 8 ký tự!" })
			.regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/, {
				message:
					"Mật khẩu phải bao gồm ít nhất 1 chữ hoa, 1 chữ thường và 1 chữ số!",
			}),
		confirmPassword: z.string(),
		code: z
			.string()
			.min(6, { message: "Mã không hợp lệ!" })
			.regex(/^\d+$/, { message: "Mã không hợp lệ!" })
			.optional()
			.or(z.literal("")),
	})
	.refine((val) => val.confirmPassword === val.password, {
		message: "Mật khẩu xác nhận không khớp!",
		path: ["confirmPassword"],
	});

const SignInSchema = z.object({
	identicator: z.string().min(1, { message: "Vui lòng nhập tên tài khoản!" }),
	password: z.string().min(1, { message: "Vui lòng nhập mật khẩu!" }),
	remember: z.boolean().optional(),
});

type SignIn = z.infer<typeof SignInSchema>;
type SignUp = z.infer<typeof SignUpSchema>;

export { SignUpSchema, SignInSchema, type SignUp, type SignIn };
