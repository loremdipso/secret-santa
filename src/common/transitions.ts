import { fade } from 'svelte/transition';
import { elasticOut } from 'svelte/easing';

export function flash(node: any, { duration }: { duration: number }): any {
	return {
		duration,
		css: t => {
			const eased = elasticOut(t);

			return `
				transform: scale(${eased}) rotate(${eased * 1080}deg);
				color: hsl(
					${Math.trunc(t * 360)},
					${Math.min(100, 1000 - 1000 * t)}%,
					${Math.min(50, 500 - 500 * t)}%
				);`
		}
	};
}