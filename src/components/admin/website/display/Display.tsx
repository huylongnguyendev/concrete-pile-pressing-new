import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldLabel } from "#/components/ui/field";

export function Display() {
	return (
		<Card>
			<CardHeader>
				<CardTitle>Hiển thị</CardTitle>
				<CardDescription>
					Tùy chọn hiển thị trên website của bạn
				</CardDescription>
			</CardHeader>
			<CardContent>
				<Field>
					<FieldLabel>Màu sắc</FieldLabel>
          
				</Field>
			</CardContent>
		</Card>
	);
}
