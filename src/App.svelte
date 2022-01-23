<script lang="ts">
	import Toast from "./components/Toast.svelte";
	import GithubCorner from "./components/GithubCorner.svelte";
	import PlayerEntry from "./components/PlayerEntry.svelte";
	import Results from "./components/Results.svelte";
	import DarkModeButton from "./components/DarkModeButton.svelte";

	import type { IPlayer, IResultPair } from "./interfaces";
	import { generateRandomPlayers, getMatchups } from "./helpers";
	import { parseFile } from "./importer";

	let showPlayerEntry = true;
	let matchups: IResultPair[] = [];

	function doCalculate() {
		// TODO: show loading graphic? Or will it just freeze?
		showPlayerEntry = false;
		matchups = getMatchups(players, true);
	}

	export let players: IPlayer[] = generateRandomPlayers(10);

	let toast: Toast;

	// Import/Export
	let fileVar;
	$: {
		let file = fileVar && fileVar[0];
		if (file) {
			const reader = new FileReader();
			reader.onload = (e) => {
				let result = parseFile(e.target.result as string);
				if (result.hasValue) {
					players = result.value;
				} else if (result.hasValue === false) {
					toast.pop(result.error);
				}
			};
			reader.readAsText(file);
		}
	}

	let fileInput: HTMLElement;
	function doImport() {
		fileInput.click();
	}

	function doExport() {
		// TODO
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
	<GithubCorner
		href="https://github.com/loremdipso/secret_santa_svelte"
		position="topLeft"
	/>

	<header
		class="justify-center top-0 w-full items-center p-0 h-16 shadow bg-primary-300 dark:bg-dark-600 top-0 w-full items-center flex-wrap flex left-0 z-30 p-0 h-16 shadow bg-dark-600 dark:bg-dark-600"
	>
		<h6 class="pl-3 text-white tracking-widest font-thin text-lg">
			Secret Santa
		</h6>

		<DarkModeButton classes="absolute right-0" />
	</header>

	<input
		bind:this={fileInput}
		class="hidden"
		type="file"
		bind:files={fileVar}
		accept=".json"
	/>

	<Toast bind:this={toast} />

	{#if showPlayerEntry}
		<PlayerEntry
			bind:players
			on:calculate={doCalculate}
			on:import={doImport}
		/>
	{:else}
		<Results
			bind:players
			bind:matchups
			bind:showPlayerEntry
			on:calculate={doCalculate}
			on:export={doExport}
		/>
	{/if}
</main>

<style>
	:global(.actions-bar) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: blue;
	}

	:global(.actions-bar > *) {
		margin-right: 5px;
	}
</style>
