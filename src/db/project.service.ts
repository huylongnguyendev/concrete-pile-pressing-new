import { createServerFn } from "@tanstack/react-start";
import { authMiddleware } from "#/middleware/auth.middleware";
import type { PaginationQuery } from "#/types/base-api.type";
import { prisma } from "@/db";
import type { Project } from "#/schema/project.schema";

const getProjectsFn = createServerFn({ method: "GET" })
	.middleware([authMiddleware])
	.validator((data: PaginationQuery) => data)
	.handler(async ({ data }) => {
		try {
			const { page, search, sort } = data;
			const take = 10;
			const skip = (page - 1) * take;

			const [projects, total] = await prisma.$transaction(async (trans) => {
				return await Promise.all([
					trans.project.findMany({
						where: { title: { contains: search, mode: "insensitive" } },
						orderBy: { createdAt: sort || "desc" },
						skip,
						take,
					}),
					trans.project.count({
						where: { title: { contains: search, mode: "insensitive" } },
					}),
				] as const);
			});

			return {
				success: true,
				message: "Tìm kiếm dự án thành công!",
				projects,
				page,
				totalItem: total,
				totalPage: Math.ceil(total / take),
			};
		} catch (_error) {
			return { success: false, message: "Có lỗi xảy ra!", projects: [] };
		}
	});

const createProjectFn = createServerFn({ method: "POST" })
	.validator((data: Project) => data)
	.handler(async ({ data }) => {
		try {
			await prisma.project.create({ data });
			return { success: true, message: "Đăng dự án thành công!" };
		} catch (_error) {
			return { success: false, message: "Có lỗi xảy ra!" };
		}
	});

export { getProjectsFn, createProjectFn };
