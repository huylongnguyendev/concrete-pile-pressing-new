import { useForm } from "@tanstack/react-form";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { AsteriskIcon, SaveIcon, UploadIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { BackBtn } from "#/components/base/BackBtn";
import { Button } from "#/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldError, FieldLabel, FieldSet } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { Spinner } from "#/components/ui/spinner";
import { useCreateProjectMutation } from "#/hooks/mutation/use-project-mutation";
import { cn } from "#/lib/utils";
import { type Project, ProjectSchema } from "#/schema/project.schema";

export const Route = createFileRoute("/admin/projects/new")({
	component: RouteComponent,
});

function RouteComponent() {
	const [selectFiles, setSelectedFiles] = useState<File[]>([]);
	const [isUploading, setIsUploading] = useState<boolean>(false);
	const { mutateAsync } = useCreateProjectMutation();
	const navigate = useNavigate();

	const form = useForm({
		defaultValues: {
			location: "",
			path: [],
			title: "",
		} as Project,
		validators: {
			onBlur: ProjectSchema,
			onChange: ProjectSchema,
		},
		onSubmit: async ({ value }) => {
			const res = await mutateAsync(value);

			if (res.success) {
				toast.success(res.message);
				navigate({ to: "/admin/projects", search: { page: 1 } });
			} else toast.error(res.message);
		},
	});

	const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		if (e.target.files) {
			const newFiles = Array.from(e.target.files);
			setSelectedFiles((prev) => [...prev, ...newFiles]);
		}
	};

	const handleRemoveFile = (index: number) => {
		setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	const handleSaveFile = async () => {
		if (selectFiles.length === 0) return;

		setIsUploading(true);
		const cloudName = "concrete-pile-pressing";
		const uploadPreset = "concrete-pile-pressing";

		try {
			const uploadedUrls: string[] = [];
			for (const file of selectFiles) {
				const formData = new FormData();
				formData.append("file", file);
				formData.append("upload_preset", uploadPreset);
				const response = await fetch(
					`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
					{
						method: "POST",
						body: formData,
					},
				);

				const data = await response.json();

				if (data.secure_url) uploadedUrls.push(data.secure_url);
				else {
					toast.error("Tải lên ảnh thất bại!");
					return;
				}
			}

			form.setFieldValue("path", uploadedUrls);
			toast.success("Tải lên hình ảnh thành công!");
		} catch (error) {
			console.error(error instanceof Error ? error.message : "");
			toast.error("Đã xảy ra lỗi trong quá trình tải lên!");
		} finally {
			setIsUploading(false);
		}
	};

	return (
		<div className="py-2 space-y-6">
			<BackBtn />
			<form
				onSubmit={(e) => {
					e.preventDefault();
					e.stopPropagation();
					form.handleSubmit();
				}}
				className="space-y-6"
			>
				<h2 className="text-xl font-semibold pl-2 border-l-4 border-primary">
					Thêm dự án mới
				</h2>
				<Card>
					<CardHeader>
						<CardTitle>Thông tin dự án</CardTitle>
					</CardHeader>
					<CardContent>
						<FieldSet>
							<form.Field name="title">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										{" "}
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name}>Tiêu đề</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="text"
												placeholder="Nhập tiêu đề tại đây..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
							<form.Field name="location">
								{({ name, state, handleBlur, handleChange }) => (
									<Field>
										{" "}
										<div className="flex -gap-2">
											<FieldLabel htmlFor={name}>Vị trí</FieldLabel>
											<AsteriskIcon className="size-3 text-destructive" />
										</div>
										<div className="space-y-0.5">
											<Input
												id={name}
												type="text"
												placeholder="Nhập vị trí tại đây..."
												value={state.value}
												onBlur={handleBlur}
												onChange={(e) => handleChange(e.target.value)}
											/>
											<FieldError className="italic">
												{state.meta.errorMap.onChange ||
												state.meta.errorMap.onSubmit
													? state.meta.errors?.[0]?.message
													: ""}
											</FieldError>
										</div>
									</Field>
								)}
							</form.Field>
						</FieldSet>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Thêm hình ảnh</CardTitle>
						<CardDescription>Thêm ít nhất một hình ảnh</CardDescription>
					</CardHeader>
					<CardContent className="space-y-4">
						<Field>
							<Button type="button" variant={"outline"} asChild>
								<FieldLabel htmlFor="input-files">
									<UploadIcon />
									<span>Tải lên hình ảnh</span>
									<Input
										id="input-files"
										type="file"
										multiple
										accept="image/*"
										hidden
										onChange={handleFileChange}
									/>
								</FieldLabel>
							</Button>
						</Field>
						<ul
							className={cn(
								"rounded-md border border-dashed grid grid-cols-1 md:grid-cols-4 gap-4 p-1",
								selectFiles.length === 0 && "block",
							)}
						>
							{selectFiles.length === 0 ? (
								<li className="h-30 flex justify-center items-center text-muted-foreground font-semibold text-sm">
									Chưa có hình ảnh nào
								</li>
							) : (
								selectFiles.map((file, index) => {
									const previewUrl = URL.createObjectURL(file);
									return (
										<li
											key={file.name}
											className="relative group border rounded-md overflow-hidden aspect-video bg-muted flex items-center justify-center"
										>
											<img
												src={previewUrl}
												alt={file.name}
												className="object-cover w-full h-full"
											/>
											<Button
												type="button"
												variant={"secondary"}
												size={"icon-sm"}
												onClick={() => handleRemoveFile(index)}
												className="absolute top-1 right-1 bg-black/60 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
											>
												<XIcon className="size-4" />
											</Button>
										</li>
									);
								})
							)}
						</ul>
						<Button
							className="max-md:w-full"
							disabled={selectFiles.length === 0 || isUploading}
							onClick={handleSaveFile}
						>
							<SaveIcon />
							<span>Lưu hình ảnh</span>
						</Button>
					</CardContent>
				</Card>
				<form.Subscribe selector={(s) => [s.canSubmit, s.isSubmitting]}>
					{([canSubmit, isSubmitting]) => (
						<Button
							type="submit"
							size={"lg"}
							className="w-full"
							disabled={!canSubmit || selectFiles.length === 0}
						>
							{isSubmitting ? (
								<>
									<Spinner />
									<span>Đang xử lý...</span>
								</>
							) : (
								<>Xác nhận</>
							)}
						</Button>
					)}
				</form.Subscribe>
			</form>
		</div>
	);
}
