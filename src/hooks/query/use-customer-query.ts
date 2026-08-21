import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
	createCustomerFn,
	deleteCustomerFn,
} from "#/db/services/customer.service";
import type { CreateCustomer } from "#/schema/customer.schema";

const useCreateCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: CreateCustomer) => createCustomerFn({ data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
	});
};

const useDeleteCustomer = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: { ids: string[] }) => deleteCustomerFn({ data }),
		onSuccess: () => queryClient.invalidateQueries({ queryKey: ["customers"] }),
	});
};

export { useCreateCustomer, useDeleteCustomer };
