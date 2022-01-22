<script lang="ts">
	import PlayerRow from "./PlayerRow.svelte";
	import type { IPlayer } from "./interfaces";
	import { findPlayerById, getPlayerId } from "./helpers";
	import Button from "smelte/src/components/Button";

	export let players: IPlayer[];
	export let showPlayerEntry: boolean;

	let showImport = false;
	let fileVar;
	function submitForm() {
		event.preventDefault();
		showImport = false;
	}

	function removeUnusedExclusions() {
		for (let player of players) {
			player.exclusions = player.exclusions.filter((exclusion) =>
				players.some((player) => player.id === exclusion)
			);
		}
		players = players;
	}
	removeUnusedExclusions();

	function removePlayer(playerId: number) {
		players = players.filter((player) => player.id !== playerId);
		removeUnusedExclusions();
	}

	function isValid(): boolean {
		// can't have a game with fewer than 3 entries (one is null)
		if (players.length < 3) {
			return false;
		}

		for (let i = 0; i < players.length - 1; i++) {
			let player = players[i];
			if (player.name.length === 0) {
				return false;
			}
			// TODO: validate email if it's provided
		}

		return true;
	}

	function doCalculate() {
		showPlayerEntry = false;
	}

	let canCalculate = false;
	$: {
		canCalculate = isValid();
		if (players[players.length - 1].name.length !== 0) {
			players.push({
				name: "",
				id: getPlayerId(),
				exclusions: [],
				email: "",
				address: "",
			});
		}
	}
</script>

<div class="actions-bar">
	<Button
		variant="unelevated"
		color="secondary"
		disabled={!canCalculate}
		on:click={() => doCalculate()}
	>
		Calculate
	</Button>

	<Button
		variant="unelevated"
		color="secondary"
		on:click={() => (showImport = true)}
	>
		<span>Import</span>
	</Button>
</div>

<div class="player-cards">
	{#each players as player (player.id)}
		<PlayerRow
			{players}
			bind:player
			on:removePlayer={(event) => removePlayer(event.detail)}
		/>
	{/each}
</div>

{#if showImport}
	<form on:submit={submitForm}>
		<input type="file" bind:files={fileVar} />
		<input type="submit" />
	</form>
{/if}

<style>
	.actions-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.actions-bar > :global(*) {
		margin-right: 5px;
	}
</style>
