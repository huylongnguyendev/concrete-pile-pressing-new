import { hash, verify } from "@node-rs/argon2";
import { createServerFn } from "@tanstack/react-start";
import type { Role } from "#/generated/prisma/enums";
import { useAppSession } from "#/lib/utils/session";
import { authMiddleware } from "#/middleware/auth.middleware";
import type { ChangePassword, SignIn, SignUp } from "#/schema/auth.schema";
import { prisma } from "@/db";

const DUMMY_PASSWORD_HASH =
	"$argon2id$v=19$m=65536,t=3,p=4$kgqk53iWJrsqngCpHA7uxg$4tuoZafJYo5Kc2vCyg1QNLCB1VhYjG1TiEJBzrsOmdM";

const DEV = process.env.DEV;
const ADMIN = process.env.ADMIN;

//  { algorithm: 2, memoryCost: 65536, timeCost: 3, parallelism: 4 }).then(console.log)
const signUpFn = createServerFn({ method: "POST" })
	.validator((data: SignUp) => data)
	.handler(async ({ data }) => {
		const {
			confirmPassword,
			password,
			username,
			phoneNumber,
			code,
			email,
			fullName,
		} = data;
		if (password !== confirmPassword)
			return {
				success: false,
				message: "Xác nhận mật khẩu không khớp!",
			};

		const existingUser = await prisma.user.findFirst({
			where: { OR: [{ username }, { phoneNumber }] },
			select: { id: true },
		});

		if (existingUser)
			return {
				success: false,
				message: "Tài khoản không hợp lệ!",
			};

		const role: Role =
			code === DEV ? "DEV" : code === ADMIN ? "ADMIN" : "STAFF";

		const hashed = await hash(password, {
			algorithm: 2,
			memoryCost: 32768,
			timeCost: 3,
			parallelism: 1,
		});

		await prisma.user.create({
			data: {
				username,
				hashed,
				role,
				fullName,
				email: email ?? "",
				phoneNumber,
			},
		});

		return {
			success: true,
			message: "Tạo tài khoản thành công!",
		};
	});

const signInFn = createServerFn({ method: "POST" })
	.validator((data: SignIn) => data)
	.handler(async ({ data }) => {
		const { identicator, password, remember } = data;
		const session = await useAppSession(
			remember !== undefined ? remember : false,
		);
		try {
			const existingUser = await prisma.user.findFirst({
				where: {
					OR: [{ username: identicator }, { phoneNumber: identicator }],
				},
				select: { id: true, hashed: true, role: true },
			});

			const passwordMacthes = await verify(
				existingUser?.hashed ?? DUMMY_PASSWORD_HASH,
				password,
			);

			const ok = existingUser !== null && passwordMacthes;

			if (!ok)
				return {
					success: false,
					message: "Tên tài khoản hoặc Mật khẩu không đúng!",
				};

			await session.update({
				userId: existingUser.id,
				role: existingUser.role,
			});

			return { success: true, message: "Đăng nhập thành công!" };
		} catch (_error) {
			return { success: false, message: "Có lỗi xảy ra!" };
		}
	});

const signOutFn = createServerFn({ method: "POST" }).handler(async () => {
	const session = await useAppSession();
	try {
		session.clear();

		return { success: true, message: "Đăng xuất thành công!" };
	} catch (_error) {
		return { success: false, message: "Có lỗi xảy ra!" };
	}
});

const changePasswordFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: ChangePassword) => data)
	.handler(async ({ context, data }) => {
		const session = await useAppSession();
		try {
			const { userId } = context.data;
			const { confirmPassword, newPassword, password } = data;

			if (newPassword !== confirmPassword) {
				session.clear();
				return {
					success: false,
					message: "Xác nhận mật khẩu không khớp!",
				};
			}

			const user = await prisma.user.findUnique({
				where: { id: userId },
				select: { hashed: true },
			});

			const passwordMacthes = await verify(
				user?.hashed ?? DUMMY_PASSWORD_HASH,
				password,
			);

			const ok = user !== null && passwordMacthes;

			if (!ok) {
				session.clear();
				return {
					success: false,
					message: "Cập nhật mật khẩu thất bại!",
				};
			}

			const hashed = await hash(newPassword, {
				algorithm: 2,
				memoryCost: 32768,
				timeCost: 3,
				parallelism: 1,
			});

			await prisma.user.update({ where: { id: userId }, data: { hashed } });
			return {
				success: true,
				message: "Cập nhật mật khẩu thành công!",
			};
		} catch (_error) {
			return { success: false, message: "Có lỗi xảy ra!" };
		}
	});

export { signInFn, signUpFn, signOutFn, changePasswordFn };
