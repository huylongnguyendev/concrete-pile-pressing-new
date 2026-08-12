import { hash, verify } from "argon2";
import { prisma } from "#/db";
import type { Role } from "#/generated/prisma/enums";
import type { SignIn, SignUp } from "#/schema/auth.schema";

const signUpServer = async ({ data }: { data: SignUp }) => {
	const adminCode = process.env.ADMIN;
	const devCode = process.env.DEV;

	try {
		const { username, phoneNumber, password, code } = data;

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

export { signUpServer, signInServer };
