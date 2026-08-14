import { createFileRoute } from "@tanstack/react-router";
import { About } from "#/components/base/sections/About";
import { ContactCTA } from "#/components/base/sections/ContactCTA";
import { Hero } from "#/components/base/sections/Hero";
import { Projects } from "#/components/base/sections/Projects";
import { Testimonials } from "#/components/base/sections/Testimonials";
import { Workflow } from "#/components/base/sections/Workflow";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div>
			<Hero />
			<About />
			<Workflow />
			<Projects />
			<Testimonials />
			<ContactCTA />
		</div>
	);
}
