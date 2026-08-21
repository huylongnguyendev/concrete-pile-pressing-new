import { createServerFn } from "@tanstack/react-start";
import type { CustomerMessage } from "#/types/message.type";
import { sendMessageServer } from "../server/message.server";

const sendMessageFn = createServerFn({ method: "POST" })
	.validator((data: CustomerMessage) => data)
	.handler(async ({ data }) => await sendMessageServer(data));

export { sendMessageFn };
