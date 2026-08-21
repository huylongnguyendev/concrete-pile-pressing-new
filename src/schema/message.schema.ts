import z from "zod";

const MessageSchema = z.object({
	fullName: z.string().min(2, "Vui lòng nhập Họ và Tên"),
	phoneNumber: z.string().regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, {
		message: "Số điện thoại không hợp lệ!",
	}),
	location: z.string().optional().or(z.literal("")),
	method: z.string().optional().or(z.literal("")),
	content: z.string().min(1, "Vui lòng nhập nội dung bạn cần hỗ trợ..."),
});

type SendMessage = z.infer<typeof MessageSchema>;

export { MessageSchema, type SendMessage };
