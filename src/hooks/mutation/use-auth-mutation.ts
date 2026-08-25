import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInFn, signOutFn, signUpFn } from "#/db/auth.service";
import type { SignIn, SignUp } from "#/schema/auth.schema";

const useAuthSignInMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: SignIn) => signInFn({ data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user"] }),
	});
};

const useAuthSignUpMutation = () =>
	useMutation({
		mutationFn: async (data: SignUp) => await signUpFn({ data }),
	});

const useAuthSignOutMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => signOutFn(),
		onSuccess: () => queryClient.setQueryData(["user"], null),
	});
};

export { useAuthSignUpMutation, useAuthSignInMutation, useAuthSignOutMutation };
