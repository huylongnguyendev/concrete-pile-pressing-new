import { useSuspenseQuery } from "@tanstack/react-query";
import { customerQueryById } from "#/db/query/customer.query";

export function CustomerDetail({ customerId }: { customerId: string }) {
	const { data } = useSuspenseQuery(customerQueryById(customerId));

	return <div>CustomerDetail</div>;
}
