import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { updateCompanyFn } from "#/db/services/company.service";
import type { Company } from "#/types/company.type";

const useUpdateContactMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Company) => updateCompanyFn({ data }),
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["company"] });
			toast.success(data.message);
		},
		onError: (error) => {
			toast.error(error.message);
		},
	});
};

export { useUpdateContactMutation };
