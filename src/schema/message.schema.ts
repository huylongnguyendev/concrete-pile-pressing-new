import z from "zod";

const MessageSchema = z.object({
	fullName: z.string().min(1, "Vui lòng nhập tên của bạn!"),
	content: z.string().min(3),
	location: z.string().optional().or(z.literal("")),
	method: z.string().optional().or(z.literal("")),
	phoneNumber: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
		message: "Số điện thoại không hợp lệ!",
	}),
});

type Message = z.infer<typeof MessageSchema>;

export { MessageSchema, type Message };
