import { useForm } from "@tanstack/react-form";
import { AsteriskIcon, SendIcon } from "lucide-react";
import { toast } from "sonner";
import { locationSelect, methodSelect } from "#/data/contact.data";
import { sendMessageFn } from "#/db/services/message.service";
import { MessageSchema, type SendMessage } from "#/schema/message.schema";
import type { CustomerMessage } from "#/types/message.type";
import { Button } from "../ui/button";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "../ui/select";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";

export function ContactForm() {
	const form = useForm({
		defaultValues: {
			fullName: "",
			content: "",
			location: "",
			method: "",
			phoneNumber: "",
		} as SendMessage,
		validators: {
			onBlur: MessageSchema,
			onChange: MessageSchema,
		},
		onSubmit: async ({ value }) => {
			const { content, fullName, method, phoneNumber, location } = value;
			const data: CustomerMessage = {
				from: fullName,
				phoneNumber,
				location: location || "Khu vực khác miền Nam",
				content: [method ? `[${method}]` : "", content]
					.filter(Boolean)
					.join("\n"),
			};

			const res = await sendMessageFn({ data });

			if (res.success) {
				toast.success(res.message);
				form.reset();
			} else toast.error(res.message);
		},
	});
	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				e.stopPropagation();
				form.handleSubmit();
			}}
			className="space-y-6"
		>
			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<form.Field name="fullName">
					{({ name, state, handleBlur, handleChange }) => (
						<Field className="space-y-2">
							<FieldLabel htmlFor={name} className="font-semibold">
								<span className="relative">
									Họ và Tên của bạn
									<AsteriskIcon className="size-3 text-destructive absolute -top-1 -right-3" />
								</span>
							</FieldLabel>
							<div className="space-y-1">
								<Input
									id={name}
									type="text"
									required
									placeholder="Ví dụ: Anh Nam"
									value={state.value}
									onChange={(e) => handleChange(e.target.value)}
									onBlur={handleBlur}
								/>
								<FieldError>
									{state.meta.errorMap.onChange
										? state.meta.errorMap.onChange
												.flat()
												.map((i) => i.message)
												.join(", ")
										: ""}
								</FieldError>
							</div>
						</Field>
					)}
				</form.Field>
				<form.Field name="phoneNumber">
					{({ name, state, handleBlur, handleChange }) => (
						<Field className="space-y-2">
							<FieldLabel htmlFor={name} className="font-semibold">
								<span className="relative">
									Số Điện Thoại
									<AsteriskIcon className="size-3 text-destructive absolute -top-1 -right-3" />
								</span>
							</FieldLabel>
							<div className="space-y-1">
								<Input
									id={name}
									type="tel"
									required
									placeholder="Ví dụ: 0912345xxx"
									value={state.value}
									onChange={(e) => handleChange(e.target.value)}
									onBlur={handleBlur}
								/>
								<FieldError>
									{state.meta.errorMap.onChange
										? state.meta.errorMap.onChange
												.flat()
												.map((i) => i.message)
												.join(", ")
										: ""}
								</FieldError>
							</div>
						</Field>
					)}
				</form.Field>
			</div>

			<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
				<form.Field name="location">
					{({ state, handleChange }) => (
						<Select
							value={state.value}
							onValueChange={(val) => handleChange(val)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Khu Vực Thi Công" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{locationSelect.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				</form.Field>
				<form.Field name="method">
					{({ state, handleChange }) => (
						<Select
							value={state.value}
							onValueChange={(val) => handleChange(val)}
						>
							<SelectTrigger>
								<SelectValue placeholder="Giải Pháp Quan Tâm" />
							</SelectTrigger>
							<SelectContent>
								<SelectGroup>
									{methodSelect.map((item) => (
										<SelectItem key={item.value} value={item.value}>
											{item.label}
										</SelectItem>
									))}
								</SelectGroup>
							</SelectContent>
						</Select>
					)}
				</form.Field>
			</div>

			<form.Field name="content">
				{({ name, state, handleBlur, handleChange }) => (
					<Field>
						<FieldLabel htmlFor={name} className="font-semibold">
							<span className="relative">
								Nội dung yêu cầu chi tiết (Quy mô nhà, số tầng...)
								<AsteriskIcon className="size-3 text-destructive absolute -top-1 -right-3" />
							</span>
						</FieldLabel>
						<div className="space-y-1">
							<Textarea
								id={name}
								rows={4}
								placeholder="Ví dụ: Tôi muốn ép cọc cho nhà dân 3 tầng diện tích 5x15m tại Biên Hòa..."
								value={state.value}
								onChange={(e) => handleChange(e.target.value)}
								onBlur={handleBlur}
								className="h-34 resize-none"
							/>
							<FieldError>
								{state.meta.errorMap.onChange
									? state.meta.errorMap.onChange
											.flat()
											.map((i) => i.message)
											.join(", ")
									: ""}
							</FieldError>
						</div>
					</Field>
				)}
			</form.Field>

			<form.Subscribe selector={(state) => [state.isSubmitting]}>
				{([isSubmitting]) => (
					<Button
						type="submit"
						size="lg"
						className="w-full py-4 h-auto text-base font-bold shadow-md"
					>
						{isSubmitting ? (
							<>
								<Spinner />
								<span>Đang xử lý...</span>
							</>
						) : (
							<>
								<SendIcon className="w-5 h-5 mr-2" />
								<span>Gửi Yêu Cầu Tư Vấn Miễn Phí</span>
							</>
						)}
					</Button>
				)}
			</form.Subscribe>
		</form>
	);
}
