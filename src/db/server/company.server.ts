import { prisma } from "#/db";
import type { Role } from "#/generated/prisma/enums";
import type { Company } from "#/types/company.type";

const getCompanyServer = async () => {
	try {
		const companies = await prisma.company.findMany({
			include: {
				addresses: { select: { id: true, address: true, priority: true } },
				phoneNumber: { select: { id: true, number: true, priority: true } },
				emails: { select: { id: true, mail: true, priority: true } },
			},
		});

		return {
			success: true,
			message: "Lấy thông tin thành công",
			companies: companies,
		};
	} catch (error) {
		return {
			success: false,
			message: error instanceof Error ? error.message : "Lỗi hệ thống",
			companies: [],
		};
	}
};

const updateCompanyServer = async (
	data: Company,
	user: { id: string; role: Role },
) => {
	try {
		const { addresses, emails, phoneNumber, id: companyId } = data;
		const { id, role } = user;
		if (
			addresses.length === 0 &&
			emails.length === 0 &&
			phoneNumber.length === 0
		)
			return {
				success: false,
				message: "Thông tin không hợp lệ!",
			};
		const exsitingUser = await prisma.user.findFirst({
			where: { AND: [{ id }, { role }] },
			select: { id: true },
		});

		if (!exsitingUser)
			return {
				success: false,
				message: "Không thể thực hiện yêu cầu!",
			};

		const findCompany = await prisma.company.findUnique({
			where: { id: companyId },
			include: {
				addresses: true,
				emails: true,
				phoneNumber: true,
			},
		});

		if (!findCompany) {
			await prisma.company.create({
				data: {
					addresses: {
						createMany: {
							data: addresses.map((item) => ({
								address: item.address,
								priority: item.priority !== undefined ? item.priority : false,
							})),
						},
					},
					phoneNumber: {
						createMany: {
							data: phoneNumber.map((item) => ({
								number: item.number.replace(/^0/, "+84"),
								priority: item.priority !== undefined ? item.priority : false,
							})),
						},
					},
					emails: {
						createMany: {
							data: emails.map((item) => ({
								mail: item.mail,
								priority: item.priority !== undefined ? item.priority : false,
							})),
						},
					},
				},
			});
		} else {
			await prisma.$transaction(async (tx) => {
				await tx.phoneNumber.deleteMany({ where: { companyId } });
				await tx.address.deleteMany({ where: { companyId } });
				await tx.email.deleteMany({ where: { companyId } });

				await tx.phoneNumber.createMany({
					data: phoneNumber.map((item) => ({
						number: item.number,
						priority: item.priority ?? false,
						companyId,
					})),
				});

				await tx.address.createMany({
					data: addresses.map((item) => ({
						address: item.address,
						priority: item.priority ?? false,
						companyId,
					})),
				});

				await tx.email.createMany({
					data: emails.map((item) => ({
						mail: item.mail,
						priority: item.priority ?? false,
						companyId,
					})),
				});
			});
		}

		return {
			success: true,
			message: "Cập nhật thông tin thành công!",
		};
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return { success: false, message: "Lỗi hệ thống!" };
	}
};

export { getCompanyServer, updateCompanyServer };
