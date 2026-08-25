import { useSession } from "@tanstack/react-start/server";
import type { Role } from "#/generated/prisma/enums";

type SessionData = {
	userId?: string;
	role?: Role;
};

export function useAppSession(remember: boolean = false) {
	return useSession<SessionData>({
		name: "app-session",
		password: process.env.SESSION_SECRET || "", // Tối thiểu 32 ký tự
		cookie: {
			secure: process.env.NODE_ENV === "production", // Chỉ HTTPS trên production
			sameSite: "lax", // Bảo vệ CSRF
			httpOnly: true, // Bảo vệ XSS
			maxAge: remember ? 7 * 24 * 60 * 60 : undefined, // 7 ngày
		},
	});
}
