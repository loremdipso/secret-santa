<script lang="ts">
	import Icon from "smelte/src/components/Icon";
	import dark from "smelte/src/dark";
	const darkMode = dark();
	darkMode.set(true);

	import Toast from "./common/Toast.svelte";
	import { toaster } from "./common/Toast.svelte";
	import GithubCorner from "./common/GithubCorner.svelte";
	import InfoDialog from "./components/InfoDialog.svelte";
	import PlayerEntry from "./components/PlayerEntry.svelte";
	import Results from "./components/Results.svelte";
	import type { IPlayer, IResultPair } from "./interfaces";
	import {
		generateRandomPlayers,
		getEmptyPlayer,
		getMatchups,
	} from "./helpers";
	import { parseFile } from "./importer";

	let showInfo = false;
	let showPlayerEntry = true;
	let matchups: IResultPair[] = [];

	function doCalculate() {
		// TODO: show loading graphic? Or will it just freeze?
		if (players.length == 0) {
			return;
		}

		matchups = getMatchups(players.slice(0, players.length - 1), true);
		if (matchups.length === players.length - 1) {
			showPlayerEntry = false;
		} else {
			toaster.alert("Can't find a valid set of pairings :(");
		}
	}

	export let players: IPlayer[] = [];

	if (isDebug) {
		players = generateRandomPlayers(30, false);
		doCalculate();
	}

	// Import
	let fileVar;
	$: {
		let file = fileVar && fileVar[0];
		if (file) {
			fileVar = null;
			const reader = new FileReader();
			reader.onload = (e) => {
				let result = parseFile(e.target.result as string);
				if (result.hasValue) {
					players = result.value;
				} else if (result.hasValue === false) {
					toaster.alert(result.error);
				}
			};
			reader.readAsText(file);
		}
	}

	let fileInput: HTMLElement;
	function doImport() {
		fileInput.click();
	}

	// ensure we always have an empty player at the end
	$: {
		if (!players.length || players[players.length - 1].name.length !== 0) {
			players.push(getEmptyPlayer());
		}
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

<main class="pb-32">
	<GithubCorner
		href="https://github.com/loremdipso/secret_santa_svelte"
		position="topLeft"
		small
	/>

	<InfoDialog bind:showDialog={showInfo} />

	<header
		class="bg-primary-300 dark:bg-black flex flex-wrap h-16 items-center justify-center left-0 p-0 shadow top-0 w-full z-30"
	>
		<h6
			class="select-none pl-3 text-white tracking-widest font-thin text-lg"
		>
			Secret Santa
		</h6>

		<div class="absolute right-0 cursor-pointer px-2" title="Show info">
			<Icon on:click={() => (showInfo = true)}>info</Icon>
		</div>
	</header>

	<input
		bind:this={fileInput}
		class="hidden"
		type="file"
		bind:files={fileVar}
		accept=".json"
	/>

	<Toast />

	{#if showPlayerEntry}
		<div>
			<PlayerEntry
				bind:players
				on:calculate={doCalculate}
				on:import={doImport}
			/>
		</div>
	{:else}
		<div>
			<Results
				bind:players
				bind:matchups
				bind:showPlayerEntry
				on:calculate={doCalculate}
			/>
		</div>
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
