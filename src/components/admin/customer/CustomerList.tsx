import { useSuspenseQuery } from "@tanstack/react-query";
import { Users2Icon } from "lucide-react";
import { customersQuery } from "#/db/query/customer.query";
import { CustomerItem } from "./CustomerItem";

export function CustomerList() {
	const { data } = useSuspenseQuery(customersQuery({ page: 1 }));

	return (
		<ul className="border border-dashed rounded-md overflow-hidden">
			{data && data.customers.length > 0 ? (
				data.customers.map((item) => (
					<li key={item.id} className="px-2 py-1.5 hover:bg-accent/20 transition-colors duration-300">
						<CustomerItem item={item} />
					</li>
				))
			) : (
				<li className="p-12 size-full flex flex-col justify-center items-center gap-4">
					<div className="bg-zinc-500 rounded-md p-2">
						<Users2Icon />
					</div>
					<div className="space-y-1 text-center">
						<h2 className="font-bold">Chưa có khách hàng nào</h2>
						<p className="text-sm text-muted-foreground font-semibold">
							Bạn chưa có khách hàng nào. Hãy thêm khách hàng mới để quản lý.
						</p>
					</div>
				</li>
			)}
		</ul>
	);
}
