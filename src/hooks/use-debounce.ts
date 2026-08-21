import { useEffect, useState } from "react";

export function useDebounce(value: string, delay: number = 300) {
	const [debounced, setDebounced] = useState<string>("");

	useEffect(() => {
		const timer = setTimeout(() => {
			setDebounced(value);
		}, delay);

		return () => clearTimeout(timer);
	}, [value, delay]);

	return { debounced };
}
