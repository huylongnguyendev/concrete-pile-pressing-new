import { hash, verify } from "argon2";
import { prisma } from "#/db";
import type { Role } from "#/generated/prisma/enums";
import { useAppSession } from "#/lib/utils/session";
import type { ChangePassword, ConfirmType, SignIn, SignUp } from "#/schema/auth.schema";

const signUpServer = async ({ data }: { data: SignUp }) => {
	const adminCode = process.env.ADMIN;
	const devCode = process.env.DEV;

	try {
		const { username, phoneNumber, password, code, email, fullName } = data;

		const user = await prisma.user.findFirst({
			where: { OR: [{ username }, { phoneNumber }] },
		});

		if (user)
			return {
				success: false,
				message:
					"Tên tài khoản hoặc Số điện thoại có thể đã tồn tại hoặc không hợp lệ!",
			};

		let role: Role = "STAFF";

		if (code === adminCode) role = "ADMIN";
		else if (code === devCode) role = "DEV";
		else role = "STAFF";

		const hashed = await hash(password);
		await prisma.user.create({
			data: {
				username,
				phoneNumber,
				email,
				fullName,
				role,
				hash: hashed,
			},
		});

		return {
			success: true,
			message: "Đăng ký tài khoản thành công!",
		};
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return {
			success: false,
			message: "Lỗi hệ thống!",
		};
	}
};

const signInServer = async ({ data }: { data: SignIn }) => {
	const session = await useAppSession(data.remember);

	try {
		const { identicator, password } = data;

		const user = await prisma.user.findFirst({
			where: { OR: [{ username: identicator }, { phoneNumber: identicator }] },
		});

		if (!user)
			return {
				success: false,
				message: "Tên đăng nhập hoặc mật khẩu không đúng!",
			};

		const { hash: hashed } = user;

		const isValidPassword = await verify(hashed, password);

		if (!isValidPassword)
			return {
				success: false,
				message: "Tên đăng nhập hoặc mật khẩu không đúng!",
			};

		await session.update({ userId: user.id, role: user.role });

		return {
			success: true,
			message: "Đăng nhập thành công!",
		};
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return {
			success: false,
			message: "Lỗi hệ thống!",
		};
	}
};

const confirmServer = async (
	data: ConfirmType & { id: string; role: Role },
) => {
	try {
		const { id, password, role } = data;
		const user = await prisma.user.findUnique({
			where: { id },
			select: { hash: true },
		});

		if (!user || role !== "ADMIN")
			return {
				success: false,
				message: "Bạn không có quyền thực hiện thao tác này!",
			};

		const isValidPassword = await verify(user.hash, password);

		if (!isValidPassword)
			return {
				success: false,
				message: "Không thể thực hiện xác thực!",
			};

		return {
			success: true,
			message: "Xác thực thành công!",
		};
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return {
			success: false,
			message: "Lỗi hệ thống!",
		};
	}
};

const changePasswordServer = async ({
	confirmPassword,
	newPassword,
	password,
	userId,
}: ChangePassword & { userId: string }) => {
	const session = await useAppSession();

	try {
		if (newPassword !== confirmPassword)
			return {
				success: false,
				message: "Xác nhận mật khẩu mới không khớp!",
			};

		const user = await prisma.user.findUnique({
			where: { id: userId },
			select: { id: true, hash: true },
		});

		if (!user)
			return {
				success: false,
				message: "Tài khoản không tồn tại hoặc không hợp lệ!",
			};

		const isValidPassword = await verify(user.hash, password);

		if (!isValidPassword)
			return {
				success: false,
				message: "Mật khẩu không đúng!",
			};

		if (newPassword === user.hash) {
			await session.clear();
			return {
				success: false,
				message: "Không thể thay đổi với mật khẩu này!",
			};
		}

		const hashed = await hash(password);

		await prisma.user.update({
			where: { id: user.id },
			data: { hash: hashed },
		});

		return { success: true, message: "Thay đổi mật khẩu thành công!" };
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return {
			success: false,
			message: "Lỗi hệ thống!",
		};
	}
};

const signOutServer = async () => {
	const session = await useAppSession();

	try {
		await session.clear();
		return {
			success: true,
			message: "Đăng xuất thành công!",
		};
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return {
			success: false,
			message: "Lỗi hệ thống!",
		};
	}
};

export {
	signUpServer,
	signInServer,
	confirmServer,
	changePasswordServer,
	signOutServer,
};
