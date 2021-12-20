<script lang="ts">
	import GithubCorner from "./GithubCorner.svelte";
	import PlayerEntry from "./PlayerEntry.svelte";
	import Results from "./Results.svelte";

	import TopAppBar, {
		Row,
		Section,
		Title,
		AutoAdjust,
		TopAppBarComponentDev,
	} from "@smui/top-app-bar";
	import { IPlayer } from "./interfaces";
	import { getPlayerId } from "./helpers";
	let topAppBar: TopAppBarComponentDev;

	let showPlayerEntry = true;

	export let players: IPlayer[] = [];
	for (let i = 0; i < 5; i++) {
		players.push({
			name: `Player ${i}`,
			id: getPlayerId(),
			exclusions: [i + 1],
			email: "",
			address: "",
		});
	}
</script>

<svelte:head>
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
	<GithubCorner href="https://github.com/loremdipso/secret_santa_svelte" />
	<TopAppBar bind:this={topAppBar} variant="fixed">
		<Row>
			<Section>
				<!-- <IconButton class="material-icons">menu</IconButton> -->
				<Title>Secret Santa</Title>
			</Section>
		</Row>
	</TopAppBar>
	<AutoAdjust {topAppBar}>
		{#if showPlayerEntry}
			<PlayerEntry bind:showPlayerEntry bind:players />
		{:else}
			<Results bind:showPlayerEntry bind:players />
		{/if}
	</AutoAdjust>
</main>

<style lang="scss">
</style>
