<script lang="ts">
	import { onMount } from "svelte";
	onMount(() => {
		// force-reset scroll top, since for some reason browsers remember this
		document.body.scrollTop = 0;
	});

	import Icon from "smelte/src/components/Icon";

	import Toast from "./common/Toast.svelte";
	import { toaster } from "./common/Toast.svelte";
	import GithubCorner from "./common/GithubCorner.svelte";
	import Santa from "./components/Santa.svelte";
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
	import Congratulations from "./components/Congratulations.svelte";

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

	const urlParams = new URLSearchParams(window.location.search);
	const secret = urlParams.get("secret");

	if (isDebug && !secret) {
		// players = generateRandomPlayers(30, 0);
		// doCalculate();
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
	<header
		class="relative slide-in-from-top bg-primary-300 dark:bg-black flex flex-wrap h-16 items-center justify-center left-0 p-0 shadow top-0 w-full z-20"
	>
		<h6 class="select-none pl-3 tracking-widest text-lg">
			<a href="." class="text-white">Secret Santa</a>
		</h6>

		<div class="absolute right-0 cursor-pointer pr-5" title="Show info">
			<Icon on:click={() => (showInfo = true)}>info</Icon>
		</div>

		<GithubCorner
			href="https://github.com/loremdipso/secret_santa_svelte"
			position="topLeft"
			small
		/>
	</header>

	<Santa />

	<InfoDialog bind:showDialog={showInfo} />

	<input
		bind:this={fileInput}
		class="hidden"
		type="file"
		bind:files={fileVar}
		accept=".json"
	/>

	<Toast />

	{#if secret}
		<div
			class="w-full max-w-3xl ml-auto mr-auto bg-white dark:bg-black p-3 mt-8"
		>
			<Congratulations {secret} />
		</div>
	{:else if showPlayerEntry}
		<div class="fade-in w-full max-w-5xl ml-auto mr-auto">
			<PlayerEntry
				bind:players
				on:calculate={doCalculate}
				on:import={doImport}
			/>
		</div>
	{:else}
		<div class="fade-in w-full max-w-3xl ml-auto mr-auto bg-white p-3 mt-8">
			<Results
				bind:players
				bind:matchups
				bind:showPlayerEntry
				on:calculate={doCalculate}
			/>
		</div>
	{/if}
</main>

<style lang="scss">
	:global(.actions-bar) {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: blue;
	}

	:global(.actions-bar > *) {
		margin-right: 5px;
	}

	:global(html) {
		height: 100vh;
		overflow: hidden;
	}

	:global(body) {
		height: 100%;
		overflow-y: scroll;
		overflow-x: auto;
	}

	:global(a) {
		// TODO: figure out why this doesn't work
		// @apply text-blue-200;
		color: rgba(29, 142, 241, 1);
	}

	:global(.padded-table td, th) {
		padding: 1rem;
	}

	:global(.padded-table d:last-child, th:last-child) {
		width: 5rem;
	}

	.slide-in-from-top {
		animation: 300ms cubic-bezier(0.17, 0.04, 0.03, 0.94) 0s 1 SlideDown;
	}
	@keyframes SlideDown {
		0% {
			transform: translate3d(0, -100%, 0);
		}
		100% {
			transform: translateZ(0);
		}
	}

	.fade-in {
		animation: 1s ease-out 0s 1 FadeIn;
	}
	@keyframes FadeIn {
		0% {
			opacity: 0;
		}
		100% {
			opacity: 1;
		}
	}
</style>
