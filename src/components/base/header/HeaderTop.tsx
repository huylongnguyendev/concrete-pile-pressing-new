import { MailIcon, SmartphoneIcon } from "lucide-react";

export function HeaderTop() {
	return (
		<div className="py-1 bg-primary text-primary-foreground">
			<div className="box flex items-center gap-8 h-5 ">
				<a
					href="tel:+84967386080"
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<SmartphoneIcon size={16} />
					<span>0967.386.080</span>
				</a>
				<a
					href="mailto:epcocbetonghungdung@gmail.com"
					className="inline-flex justify-center items-center gap-1 text-sm"
				>
					<MailIcon size={16} />
					<span>epcocbetonghungdung@gmail.com</span>
				</a>
			</div>
		</div>
	);
}
