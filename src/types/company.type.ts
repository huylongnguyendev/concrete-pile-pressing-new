interface PhoneNumberItem {
	id: string;
	number: string;
}

interface Email {
	id: string;
	mail: string;
}

interface Address {
	id: string;
	address: string;
}

interface Company {
	id: string;
	phoneNumber: PhoneNumberItem[];
	emails: Email[];
	addresses: Address[];
}

export type { PhoneNumberItem, Email, Address, Company };
