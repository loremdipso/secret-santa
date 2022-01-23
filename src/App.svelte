<script lang="ts">
	import Button from "smelte/src/components/Button";
	import dark from "smelte/src/dark";

	import GithubCorner from "./components/GithubCorner.svelte";
	import PlayerEntry from "./components/PlayerEntry.svelte";
	import Results from "./components/Results.svelte";
	import type { IPlayer } from "./interfaces";
	import { getPlayerId } from "./helpers";

	let showPlayerEntry = true;
	export let players: IPlayer[] = [];
	for (let i = 0; i < 5; i++) {
		players.push({
			name: `Player ${i}`,
			id: getPlayerId(),
			exclusions: [],
			email: "",
			address: "",
		});
	}

	for (let i = 0; i < players.length - 1; i++) {
		let player = players[i];
		let nextPlayer = players[i + 1];
		player.exclusions.push(nextPlayer.id);
	}

	const darkMode = dark();
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

	<header
		class="top-0 w-full items-center flex-wrap flex left-0 z-30 p-0 h-16 shadow bg-primary-300 dark:bg-dark-600 top-0 w-full items-center flex-wrap flex left-0 z-30 p-0 h-16 shadow bg-dark-600 dark:bg-dark-600"
	>
		<h6 class="pl-3 text-white tracking-widest font-thin text-lg">
			Secret Santa
		</h6>

		<Button bind:value={$darkMode}>Toggle dark mode</Button>
	</header>

	{#if showPlayerEntry}
		<PlayerEntry bind:showPlayerEntry bind:players />
	{:else}
		<Results bind:showPlayerEntry bind:players />
	{/if}
</main>

<style>
</style>
