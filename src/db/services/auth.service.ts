import { createServerFn } from "@tanstack/react-start";
import type { ConfirmType, SignIn, SignUp } from "#/schema/auth.schema";
import { authMiddleware } from "../middleware/auth.middleware";
import {
	changePasswordServer,
	confirmServer,
	signInServer,
	signUpServer,
} from "../server/auth.server";
import type { ChangePassword } from "#/schema/change-password.schema";

const signUpFn = createServerFn({ method: "POST" })
	.validator((data: SignUp) => data)
	.handler(async ({ data }) => await signUpServer({ data }));

const signInFn = createServerFn({ method: "POST" })
	.validator((data: SignIn) => data)
	.handler(async ({ data }) => await signInServer({ data }));

const confirmPasswordFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: ConfirmType) => data)
	.handler(
		async ({ data, context }) =>
			await confirmServer({
				id: context.session.userId,
				password: data.password,
				role: context.session.role,
			}),
	);

const changePasswordFn = createServerFn({ method: "POST" })
	.middleware([authMiddleware])
	.validator((data: ChangePassword) => data)
	.handler(
		async ({ context, data }) =>
			await changePasswordServer({ ...data, userId: context.session.userId }),
	);
export { signUpFn, signInFn, confirmPasswordFn, changePasswordFn };
