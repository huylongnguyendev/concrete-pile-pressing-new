import { prisma } from "#/db";

const getCompanyServer = async () => {
	try {
		const companies = await prisma.company.findMany({
			include: {
				addresses: { select: { id: true, address: true } },
				phoneNumber: { select: { id: true, number: true } },
				emails: { select: { id: true, mail: true } },
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

export { getCompanyServer };
