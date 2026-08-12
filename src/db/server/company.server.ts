import { prisma } from "#/db";

const getCompanyServer = async () => {
	try {
		const companies = await prisma.company.findMany();

		return {
			success: true,
			message: "Lấy thông tin thành công",
			company: companies[0] || null,
		};
	} catch (error) {
		if (error instanceof Error) throw new Error(error.message);
		return {
			success: false,
			message: "Lỗi hệ thống",
		};
	}
};

export { getCompanyServer };
