import { createServerFn } from "@tanstack/react-start";
import type { Message } from "#/schema/message.schema";

const sendMessageFn = createServerFn({ method: "POST" })
	.validator((data: Message) => data)
	.handler(async ({ data }) => {
		try {
			const { fullName, content, phoneNumber, location, method } = data;
			const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
			const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
			const messageText = `
🚨 *CÓ YÊU CẦU TƯ VẤN ÉP CỌC MỚI!* 🚨

👤 *Họ tên:* ${fullName}
📞 *Số điện thoại:* \`${phoneNumber}\`
📍 *Khu vực:* ${location || "Chưa xác định"}
    *Dịch vụ:* ${method || "Chưa xác định"}
📝 *Nội dung yêu cầu:*
${content}
      `.trim();

			const telegramUrl = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

			const response = await fetch(telegramUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					chat_id: CHAT_ID,
					text: messageText,
					parse_mode: "Markdown",
				}),
			});

			const result = await response.json();

			if (!result.ok)
				return {
					success: false,
					message: "Không thể gửi tin nhắn!",
				};

			return {
				success: true,
				message: "Gửi yêu cầu thành công! Chúng tôi sẽ liên hệ lại sớm nhất.",
			};
		} catch (_error) {
			return { success: false, message: "Có lỗi xảy ra!" };
		}
	});

export { sendMessageFn };
