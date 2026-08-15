import { hash, verify } from "argon2";
import { prisma } from "#/db";
import type { Role } from "#/generated/prisma/enums";
import type { ConfirmType, SignIn, SignUp } from "#/schema/auth.schema";
import { useAppSession } from "#/lib/utils/session";

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
	const session = await useAppSession();

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

		session.update({ userId: user.id, role: user.role });

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

export { signUpServer, signInServer, confirmServer };
