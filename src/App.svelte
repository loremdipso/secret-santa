<script lang="ts">
	import GithubCorner from "./GithubCorner.svelte";
	import MainContent from "./MainContent.svelte";

	import TopAppBar, {
		Row,
		Section,
		Title,
		AutoAdjust,
		TopAppBarComponentDev,
	} from "@smui/top-app-bar";
	import Card, { Content } from "@smui/card";
	let topAppBar: TopAppBarComponentDev;
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
	<TopAppBar bind:this={topAppBar} variant="fixed">
		<Row>
			<Section>
				<!-- <IconButton class="material-icons">menu</IconButton> -->
				<Title>Secret Santa</Title>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		<Card padded>
			<MainContent />
		</Card>
	</AutoAdjust>

	<!-- <Button on:click={() => clicked++} variant="unelevated">
		<Label>Default</Label>
	</Button> -->
</main>

<style lang="scss">
	// 	max-width: 850px;
	// }

	// main {
	// text-align: center;
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
	// }
</style>
