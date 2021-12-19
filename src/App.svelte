<script lang="ts">
	import GithubCorner from "./GithubCorner.svelte";
	import Button, { Label } from "@smui/button";

	let name: string = "world";
	let clicked = 0;
</script>

<svelte:head>
	<link rel="stylesheet" href="node_modules/svelte-material-ui/bare.css" />

	<!-- Material Icons -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/icon?family=Material+Icons"
	/>
	<!-- Roboto -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,600,700"
	/>
	<!-- Roboto Mono -->
	<link
		rel="stylesheet"
		href="https://fonts.googleapis.com/css?family=Roboto+Mono"
	/>
</svelte:head>

<main>
	<GithubCorner href="https://github.com/loremdipso/secret_santa" />
	<h1>Hello {name}!</h1>
	<p>
		Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
		how to build Svelte apps.
	</p>

	<Button on:click={() => clicked++}>
		<Label>Default</Label>
	</Button>
</main>

<style lang="scss">
	main {
		text-align: center;
		// padding: 1em;
		// max-width: 240px;
		// margin: 0 auto;

		// h1 {
		// 	// color: #ff3e00;
		// 	text-transform: uppercase;
		// 	font-size: 4em;
		// 	font-weight: 100;
		// }

		// @media (min-width: 640px) {
		// 	max-width: none;
		// }
	}
</style>
