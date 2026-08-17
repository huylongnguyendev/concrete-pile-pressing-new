import { prisma } from "#/db";
import type { CustomerMessage } from "#/types/message.type";

async function sendMessageServer(data: CustomerMessage) {
	try {
		await prisma.message.create({ data });
		return { success: true, message: "Gửi tin nhắn thành công!" };
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
		};
	}
}

export { sendMessageServer };
