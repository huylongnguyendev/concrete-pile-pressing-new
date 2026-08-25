import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/middleware/auth.middleware";
import type { UserUpdate } from "#/schema/user.schema";
import { prisma } from "@/db";

const getUserByIdFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => {
		const { userId } = context.data;

		const user = await prisma.user.findUnique({
			where: { id: userId },
			omit: { hashed: true },
		});

		if (!user)
			return {
				success: false,
				message: "Không tìm thấy người dùng!",
				user,
			};

		return { success: true, message: "Tìm kiếm người dùng thành công!", user };
	});

const updateUserFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: UserUpdate) => data)
	.handler(async ({ context, data }) => {
		const { userId } = context.data;
		const user = await prisma.user.update({
			where: { id: userId },
			data,
			omit: { hashed: true },
		});
		return {
			success: true,
			message: "Cập nhật thông tin tài khoản thành công!",
			user,
		};
	});

export { getUserByIdFn, updateUserFn };
