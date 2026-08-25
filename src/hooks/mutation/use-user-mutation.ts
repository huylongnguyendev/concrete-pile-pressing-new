import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import { updateUserFn } from "#/db/user.service";
import type { UserUpdate } from "#/schema/user.schema";

export const useUserMutation = () => {
	const queryClient = useQueryClient();
	const router = useRouter();

	return useMutation({
		mutationFn: (data: UserUpdate) => updateUserFn({ data }),
		onSuccess: async (data) => {
			queryClient.setQueryData(["user"], data.user);

			await router.invalidate();
		},
	});
};
