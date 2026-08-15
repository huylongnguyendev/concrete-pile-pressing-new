import { createMiddleware } from "@tanstack/react-start";
import { useAppSession } from "#/lib/utils/session";

export const authMiddleware = createMiddleware({ type: "function" })
	.validator((data) => data)
	.server(async ({ next }) => {
		const session = await useAppSession();

		const { userId } = session.data;

		if (!userId) {
			throw new Error("Phiên đã hết hạn!");
		}

		return next({
			context: { session: session.data }, // ✅ truyền session xuống handler
		});
	});
