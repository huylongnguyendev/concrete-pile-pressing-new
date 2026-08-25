import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/base/sections/About";
import { ContactCTA } from "#/components/base/sections/ContactCTA";
import { Hero } from "#/components/base/sections/Hero";
import { Projects } from "#/components/base/sections/Projects";
import { Testimonials } from "#/components/base/sections/Testimonials";
import { Workflow } from "#/components/base/sections/Workflow";

export const Route = createFileRoute("/")({
	component: Home,
	head: () => ({
		meta: [
			{
				title: "Ép Cọc Bê Tông Hùng Dũng | Đơn Vị Thi Công Uy Tín Miền Nam",
			},
			{
				name: "description",
				content:
					"Ép cọc bê tông uy tín tại Đồng Nai & miền Nam. Chuyên ép cọc tải, neo trọn gói, khảo sát miễn phí.",
			},
			{
				property: "og:title",
				content: "Ép Cọc Bê Tông Hùng Dũng | Đơn Vị Thi Công Uy Tín Miền Nam",
			},
			{
				property: "og:description",
				content:
					"Ép cọc bê tông uy tín tại Đồng Nai & miền Nam. Chuyên ép cọc tải, neo trọn gói, khảo sát miễn phí.",
			},
			{
				property: "og:url",
				content: "http://localhost:3001/",
			},
		],
	}),
});

function Home() {
	return (
		<>
			<Hero />
			<About />
			<Workflow />
			<Projects />
			<Testimonials />
			<ContactCTA />
		</>
	);
}