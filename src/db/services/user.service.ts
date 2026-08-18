import { createServerFn } from "@tanstack/react-start";
import type { UserChange } from "#/schema/user.schema";
import { authMiddleware } from "../middleware/auth.middleware";
import { editUserInfoServer, getUser } from "../server/user.server";

const getUserFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.handler(async ({ context }) => await getUser(context.session.userId));

const editUserFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: UserChange) => data)
	.handler(
		async ({ data, context }) =>
			await editUserInfoServer({ ...data, userId: context.session.userId }),
	);

export { getUserFn, editUserFn };
