import { useAppStore } from "@lavaz/store";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Users2Icon } from "lucide-react";
import { useEffect } from "react";
import { Spinner } from "#/components/ui/spinner";
import { customersQuery } from "#/db/query/customer.query";
import { store } from "#/store/store";
import type { CustomerQuery } from "#/types/customer.type";
import { CustomerItem } from "./CustomerItem";

export function CustomerList({ search }: { search: CustomerQuery }) {
	const { data, isPending } = useSuspenseQuery(
		customersQuery({ page: search.page, search: search.search }),
	);

	const [{ ids, isSelectAll }, { setSelectAll, setSelect, setIsSelectAll }] =
		useAppStore(store.selectAll, (s) => s);

	useEffect(() => {
		if (!data || !data.success || data.customers.length === 0) return;
		if (isSelectAll) setSelectAll(data.customers.map((item) => item.id));
	}, [data, setSelectAll, isSelectAll]);

	useEffect(() => {
		if (!data || !data.success || data.customers.length === 0) return;

		setIsSelectAll(data.customers.length === ids.length);
	}, [data, setIsSelectAll, ids]);

	if (isPending)
		return (
			<div className="border border-dashed rounded-md py-8">
				<div className="p-4 size-full flex flex-col justify-center items-center gap-4">
					<Spinner />
					<p className="text-lg font-semibold text-muted-foreground">
						Đang tải dữ liệu... Vui lòng chờ trong giây lát!
					</p>
				</div>
			</div>
		);

	return (
		<ul className="border border-dashed rounded-md overflow-hidden">
			{data && data.customers.length > 0 ? (
				data.customers.map((item) => (
					<li
						key={item.id}
						className="px-2 py-1.5 hover:bg-accent/20 transition-colors duration-300"
					>
						<CustomerItem
							item={item}
							onSelect={setSelect}
							isSelect={ids.includes(item.id)}
						/>
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
