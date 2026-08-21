import { prisma } from "#/db";
import type { UserChange } from "#/schema/user.schema";

const getUser = async (userId: string) => {
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
};

const editUserInfoServer = async ({
	email,
	fullName,
	phoneNumber,
	userId,
}: UserChange & { userId: string }) => {
	try {
		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true },
		});

		if (!user)
			return { success: false, message: "Thay đổi thông tin thất bại!" };

		await prisma.user.update({
			where: { id: user.id },
			data: { phoneNumber, fullName, email },
		});

		return {
			success: true,
			message: "Thay đổi thông tin thành công!",
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
		};
	}
};

export { getUser, editUserInfoServer };
