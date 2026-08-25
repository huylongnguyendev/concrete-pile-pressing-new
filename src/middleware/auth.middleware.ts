import { createMiddleware } from "@tanstack/react-start";
import { useAppSession } from "#/lib/utils/session";

const authMiddleware = createMiddleware({ type: "function" }).server(
	async ({ next }) => {
		const session = await useAppSession();

		const { userId } = session.data;

		if (!userId) throw new Error("Phiên đã hết hạn!");
		return next({ context: session });
	},
);

export { authMiddleware };
