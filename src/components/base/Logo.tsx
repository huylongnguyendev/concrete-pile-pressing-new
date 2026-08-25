import { Link } from "@tanstack/react-router";

export function Logo() {
	return (
		<div className="logo font-heading">
			<Link to="/" className="inline-flex flex-col items-center justify-center uppercase font-heading text-primary">
				<h2 className="text-xl font-bold tracking-widest">Hùng Dũng</h2>
				<p className="text-xs">Ép cọc bê tông uy tín</p>
			</Link>
		</div>
	);
}
