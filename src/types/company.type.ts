type ContactType = "phoneNumber" | "addresses" | "emails";

interface PhoneNumberItem {
	id: string;
	number: string;
	priority?: boolean;
}

interface Email {
	id: string;
	mail: string;
	priority?: boolean;
}

interface Address {
	id: string;
	address: string;
	priority?: boolean;
}

interface Company {
	id: string;
	phoneNumber: PhoneNumberItem[];
	emails: Email[];
	addresses: Address[];
}

export type {
	PhoneNumberItem,
	Email,
	Address,
	Company,
	ContactType,
};
