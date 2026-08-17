import { prisma } from "#/db";

async function getUser(userId: string) {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			omit: { hash: true },
		});
		if (!user)
			return { success: false, message: "Tài khoản không tồn tại!", user };

		return {
			success: true,
			message: "Lấy thông tin tài khoản thành công!",
			user,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
			user: null,
		};
	}
}

export { getUser };
