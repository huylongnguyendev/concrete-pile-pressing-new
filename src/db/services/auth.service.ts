import { createServerFn } from "@tanstack/react-start";
import type { SignIn, SignUp } from "#/schema/auth.schema";
import { signInServer, signUpServer } from "../server/auth.server";

const signUpFn = createServerFn({ method: "POST" })
	.validator((data: SignUp) => data)
	.handler(async ({ data }) => await signUpServer({ data }));

const signInFn = createServerFn({ method: "POST" })
	.validator((data: SignIn) => data)
	.handler(async ({ data }) => await signInServer({ data }));

export { signUpFn, signInFn };
