import { useSession } from "@tanstack/react-start/server";

export function useAppSession() {
	const password = process.env.SESSION_SECRET;

	if (!password) throw new Error("Phiên đã hết hạn!");

	return useSession({
		name: "app-session",
		password,
		cookie: {
			secure: process.env.NODE_ENV === "production",
			sameSite: "lax",
			httpOnly: true,
		},
	});
}
