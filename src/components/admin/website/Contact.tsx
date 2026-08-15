import { useAppStore } from "@lavaz/store";
import { useEffect, useMemo } from "react";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardAction,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { FieldGroup } from "#/components/ui/field";
import { store } from "#/store/store";
import type {
	Address,
	Company,
	Email,
	PhoneNumberItem,
} from "#/types/company.type";
import { ContactInputForm } from "./ContactInputForm";
import { AddressForm } from "./input-forms/AddressForm";
import { EmailForm } from "./input-forms/EmailForm";
import { PhoneForm } from "./input-forms/PhoneForm";
import { useUpdateContactMutation } from "#/hooks/query/use-contact-query";
import { SaveIcon } from "lucide-react";
import { Spinner } from "#/components/ui/spinner";

type GenericContactItem = PhoneNumberItem | Email | Address;

export function Contact({ company }: { company: Company }) {
	const { id, addresses, emails, phoneNumber } = company;

	const [values, { setAll, setAdd }] = useAppStore(
		store.companyInput,
		(s) => s,
	);
	const { mutate, isPending } = useUpdateContactMutation();

	useEffect(() => {
		const value = id
			? { id, addresses, emails, phoneNumber }
			: {
					id: "",
					phoneNumber: [{ id: "", number: "", priority: true }],
					addresses: [{ id: "", address: "", priority: true }],
					emails: [{ id: "", mail: "", priority: true }],
				};
		setAll(value);
	}, [setAll, id, addresses, phoneNumber, emails]);

	const canSubmit = useMemo(() => {
		const isDifferent = (
			arr1: GenericContactItem[],
			arr2: GenericContactItem[],
			key: "number" | "address" | "mail",
		) => {
			if (arr1.length !== arr2.length) return true;

			const getUniqueMap = (arr: GenericContactItem[]) =>
				Array.from(
					new Map(
						arr.map((item) => [
							String(item[key as keyof GenericContactItem] ?? ""),
							item,
						]),
					).values(),
				);

			const unique1 = getUniqueMap(arr1);
			const unique2 = getUniqueMap(arr2);

			if (unique1.length !== unique2.length) return true;

			return unique1.some((item1) => {
				const val1 = item1[key as keyof GenericContactItem];
				const matchItem = unique2.find(
					(item2) => item2[key as keyof GenericContactItem] === val1,
				);

				if (!matchItem) return true;
				return matchItem.priority !== item1.priority;
			});
		};

		const hasPhoneChanged = isDifferent(
			phoneNumber,
			values.phoneNumber,
			"number",
		);
		const hasAddressChanged = isDifferent(
			addresses,
			values.addresses,
			"address",
		);
		const hasMailChanged = isDifferent(emails, values.emails, "mail");

		return hasPhoneChanged || hasAddressChanged || hasMailChanged;
	}, [phoneNumber, addresses, emails, values]);

	return (
		<Card>
			<CardHeader>
				<CardTitle>Thông tin liên hệ</CardTitle>
				<CardDescription>
					Thông tin được hiển thị trên website để khách hàng có thể liên hệ đến
					doanh nghiệp của bạn
				</CardDescription>
			</CardHeader>
			<CardContent>
				<FieldGroup>
					<ContactInputForm
						label="Số điện thoại liên hệ"
						onAddValue={() => setAdd("phoneNumber")}
						canAdd={
							values.phoneNumber.length <= 1 &&
							values.phoneNumber[0].number === ""
						}
					>
						<PhoneForm values={values.phoneNumber} />
					</ContactInputForm>
					<ContactInputForm
						label="Địa chỉ email liên hệ"
						onAddValue={() => setAdd("emails")}
						canAdd={values.emails.length <= 1 && values.emails[0].mail === ""}
					>
						<EmailForm values={values.emails} />
					</ContactInputForm>
					<ContactInputForm
						label="Địa chỉ liên hệ"
						onAddValue={() => setAdd("addresses")}
						canAdd={
							values.addresses.length <= 1 && values.addresses[0].address === ""
						}
					>
						<AddressForm values={values.addresses} />
					</ContactInputForm>
				</FieldGroup>
			</CardContent>
			<CardFooter>
				<CardAction className="flex justify-end gap-2 w-full">
					<Button variant={"secondary"}>Hủy bỏ</Button>
					<Button
						disabled={!canSubmit || isPending}
						onClick={() => mutate(values)}
					>
						{isPending ? (
							<>
								<Spinner />
								<span>Đang xử lý...</span>
							</>
						) : (
							<>
								<SaveIcon />
								<span>Lưu thông tin</span>
							</>
						)}
					</Button>
				</CardAction>
			</CardFooter>
		</Card>
	);
}
