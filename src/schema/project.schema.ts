import z from "zod";

const ProjectSchema = z.object({
	title: z
		.string()
		.min(1, "Tiêu đề không được để trống!")
		.max(100, "Tiêu đề không vượt quá 100 ký tự!"),
	path: z.array(z.string()).min(1, "Phải có ít nhất 1 hình ảnh!"),
	location: z.string().min(1, "Vị trí không được để trống!"),
});

type Project = z.infer<typeof ProjectSchema>;

export { ProjectSchema, type Project };
