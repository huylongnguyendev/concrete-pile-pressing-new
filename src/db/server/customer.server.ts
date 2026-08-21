import { prisma } from "#/db";
import type { Role } from "#/generated/prisma/enums";
import type { CreateCustomer } from "#/schema/customer.schema";
import type { CustomerQuery } from "#/types/customer.type";

const getCustomersServer = async ({
	userId,
	search,
	sort,
	page,
}: { userId: string } & CustomerQuery) => {
	try {
		const limit = 20;
		const skip = (page - 1) * limit;
		const whereCondition = search
			? {
					userId,
					OR: [
						{ fullName: { contains: search, mode: "insensitive" as const } },
						{ phoneNumber: { contains: search, mode: "insensitive" as const } },
					],
				}
			: { userId };
		const [customers, count] = await prisma.$transaction(async (ts) => {
			return await Promise.all([
				await ts.customer.findMany({
					where: whereCondition,
					select: { id: true, fullName: true, phoneNumber: true },
					skip,
					take: limit,
					orderBy: { createdAt: sort ? sort : "desc" },
				}),
				await ts.customer.count({ where: whereCondition }),
			]);
		});

		return {
			success: true,
			message: "Tìm kiếm danh sách khách hàng thành công!",
			customers,
			page,
			totalItem: limit,
			totalPage: Math.ceil(count / limit),
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
			customers: [],
			page,
			totalItem: 0,
			totalPage: 1,
		};
	}
};

const getCustomerByIdServer = async ({
	customerId,
	userId,
}: {
	userId: string;
	customerId: string;
}) => {
	try {
		const customer = await prisma.customer.findUnique({
			where: { id: customerId, userId },
		});

		if (!customer)
			return {
				success: false,
				message: "Khách hàng không tồn tại!",
				customer,
			};

		return {
			success: true,
			message: "Tìm kiếm khách hàng thành công!",
			customer,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
			customer: null,
		};
	}
};

const createCustomerServer = async ({
	userId,
	fullName,
	location,
	phoneNumber,
}: { userId: string } & CreateCustomer) => {
	try {
		const existing = await prisma.customer.findUnique({
			where: { phoneNumber },
			select: { id: true },
		});

		if (existing) {
			return {
				success: false,
				message: "Khách hàng đã tồn tại!",
			};
		}

		await prisma.customer.create({
			data: { fullName, location, phoneNumber, userId },
		});

		return {
			success: true,
			message: "Tạo khách hàng thành công!",
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
		};
	}
};

const deleteCustomersServer = async ({
	ids,
	role,
}: {
	ids: string[];
	role: Role;
}) => {
	try {
		if (role !== "ADMIN")
			return {
				success: false,
				message: "Không thể xóa khách hàng!",
			};

		if (ids.length === 1)
			await prisma.customer.delete({ where: { id: ids[0] } });
		else await prisma.customer.deleteMany({ where: { id: { in: ids } } });

		return {
			success: true,
			message: "Xóa khách hàng thành công!",
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
		};
	}
};

export {
	getCustomersServer,
	createCustomerServer,
	getCustomerByIdServer,
	deleteCustomersServer,
};
