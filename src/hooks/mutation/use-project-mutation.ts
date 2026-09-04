import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProjectFn } from "#/db/project.service";
import type { Project } from "#/schema/project.schema";

const useCreateProjectMutation = () => {
	const queryClient = useQueryClient();
	return useMutation({
		mutationFn: (data: Project) => createProjectFn({ data }),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["projects"] });
		},
	});
};

export { useCreateProjectMutation };
