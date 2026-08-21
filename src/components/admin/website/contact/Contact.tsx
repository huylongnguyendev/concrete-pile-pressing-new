import { useAppStore } from "@lavaz/store";
import { SaveIcon } from "lucide-react";
import { useEffect } from "react";
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
import { Spinner } from "#/components/ui/spinner";
import { useUpdateContactMutation } from "#/hooks/query/use-contact-query";
import { store } from "#/store/store";
import type { Company } from "#/types/company.type";
import { ContactInputForm } from "./ContactInputForm";
import { AddressForm } from "./input-forms/AddressForm";
import { EmailForm } from "./input-forms/EmailForm";
import { PhoneForm } from "./input-forms/PhoneForm";
import { DialogTrigger } from "#/components/ui/dialog";

export function Contact({ company }: { company: Company }) {
	const { id, addresses, emails, phoneNumber } = company;

	const [values, { setAll, setAdd }] = useAppStore(
		store.companyInput,
		(s) => s,
	);
	const { mutate, isPending } = useUpdateContactMutation();

	const [isConfirm] = useAppStore(store.confirmPassword, (s) => s.isConfirm);

	const handleReset = () => {
		setAll(
			id
				? { id, addresses, emails, phoneNumber, canSubmit: false }
				: {
						id: "",
						phoneNumber: [{ id: "", number: "", priority: true }],
						addresses: [{ id: "", address: "", priority: true }],
						emails: [{ id: "", mail: "", priority: true }],
						canSubmit: false,
					},
		);
	};

	useEffect(() => {
		const value = id
			? { id, addresses, emails, phoneNumber, canSubmit: false }
			: {
					id: "",
					phoneNumber: [{ id: "", number: "", priority: true }],
					addresses: [{ id: "", address: "", priority: true }],
					emails: [{ id: "", mail: "", priority: true }],
					canSubmit: false,
				};
		setAll(value);
	}, [setAll, id, addresses, phoneNumber, emails]);

	const canSubmit = values.canSubmit;

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
					<Button variant={"secondary"} onClick={handleReset}>
						Hủy bỏ
					</Button>

					{isConfirm ? (
						<Button disabled={!canSubmit} onClick={() => mutate(values)}>
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
					) : (
						<DialogTrigger asChild>
							<Button disabled={!canSubmit}>
								<SaveIcon />
								<span>Lưu thông tin</span>
							</Button>
						</DialogTrigger>
					)}
				</CardAction>
			</CardFooter>
		</Card>
	);
}
