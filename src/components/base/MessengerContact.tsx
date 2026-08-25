import contact from "#/data/json/contact.json" with { type: "json" };

export function MessengerContact() {
	return (
		<a
			href={`https://m.me/${contact.messenger}`}
			className="relative transition-transform hover:scale-110"
			title="Liên hệ qua Messenger/Facebook"
		>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="50"
				height="50"
				viewBox="0 0 50 50"
				fill="none"
				className="relative z-10 drop-shadow-lg"
			>
				<title>Liên hệ qua Messenger</title>
				<path
					d="M25 0C11.193 0 0 10.515 0 23.5c0 6.643 2.68 12.658 7.009 16.969V48l7.868-4.321C17.37 44.381 21.085 45 25 45c13.807 0 25-10.515 25-23.5S38.807 0 25 0z"
					fill="url(#paint0_linear)"
				/>
				<path
					d="M13.25 31.75l7.942-12.707 5.421 5.421 9.337-5.421-7.942 12.707-5.421-5.421-9.337 5.421z"
					fill="#fff"
				/>
				<defs>
					<linearGradient
						id="paint0_linear"
						x1="25"
						y1="0"
						x2="25"
						y2="45"
						gradientUnits="userSpaceOnUse"
					>
						<stop stopColor="#00B2FF" />
						<stop offset="1" stopColor="#006AFF" />
					</linearGradient>
				</defs>
			</svg>
			<span className="absolute size-12.5 top-1/2 left-1/2 -translate-1/2 bg-blue-400/50 animate-ping rounded-full pointer-events-none" />
		</a>
	);
}
