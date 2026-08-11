import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "#/components/base/sections/Hero";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<div>
			<Hero />
		</div>
	);
}
