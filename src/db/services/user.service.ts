import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "../middleware/auth.middleware";
import { getUser } from "../server/user.server";

const getUserFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => await getUser(context.session.userId));

export { getUserFn };
