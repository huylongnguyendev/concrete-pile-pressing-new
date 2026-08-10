import { neon } from "@neondatabase/serverless";

let client: ReturnType<typeof neon>;
const DATABASE_URL = process.env.DATABASE_URL;

export async function getClient() {
	if (!DATABASE_URL) {
		return undefined;
	}

	if (!client) {
		client = await neon(DATABASE_URL);
	}

	return client;
}
