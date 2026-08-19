import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCustomerFn } from "#/db/services/customer.service";
import type { CreateCustomer } from "#/schema/customer.schema";

const useCreateCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CreateCustomer) => createCustomerFn({ data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
	});
};

export { useCreateCustomer };
