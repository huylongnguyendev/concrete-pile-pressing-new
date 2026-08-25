import type { Role } from "#/generated/prisma/enums";

interface User {
	id: string;
	role: Role;
	email: string | null;
	username: string;
	phoneNumber: string;
	fullName: string;
}

export type { User };
