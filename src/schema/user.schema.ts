import z from "zod";

const UserSchema = z.object({
	fullName: z
		.string()
		.min(3, { message: "Họ tên phải có ít nhất 3 ký tự!" })
		.optional()
		.or(z.literal("")),
	phoneNumber: z
		.string()
		.regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
			message: "Số điện thoại không hợp lệ!",
		})
		.optional()
		.or(z.literal("")),
	email: z
		.string()
		.email({ message: "Email không hợp lệ!" })
		.optional()
		.or(z.literal(""))
		.optional()
		.or(z.literal("")),
});

type UserUpdate = z.infer<typeof UserSchema>;

export { UserSchema, type UserUpdate };
