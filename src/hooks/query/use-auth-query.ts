import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { signOutFn } from "#/db/services/auth.service";

export function useAuthSignOut() {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: () => signOutFn(),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["user"] });
			toast.success(data.message);
		},
		onError: (e) => toast.error(e.message),
	});
}
