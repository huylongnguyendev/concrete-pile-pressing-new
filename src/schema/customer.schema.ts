import z from "zod";

const CustomerSchema = z.object({
	fullName: z.string().min(3, "Họ và tên không được để trống"),
	phoneNumber: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
		message: "Số điện thoại không hợp lệ!",
	}),
	location: z.string(),
});

type CreateCustomer = z.infer<typeof CustomerSchema>;

export { CustomerSchema, type CreateCustomer };
