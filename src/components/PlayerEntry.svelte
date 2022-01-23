<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "smelte/src/components/Button";

	import PlayerRow from "./PlayerRow.svelte";
	import type { IPlayer } from "../interfaces";
	import { getPlayerId } from "../helpers";
	import ActionBar from "./ActionBar.svelte";

	export let players: IPlayer[];

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

	let dispatch = createEventDispatcher();

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

<ActionBar>
	<Button
		variant="unelevated"
		color="secondary"
		disabled={!canCalculate}
		on:click={() => dispatch("calculate")}
	>
		Calculate
	</Button>

	<Button
		variant="unelevated"
		color="secondary"
		on:click={() => dispatch("import")}
	>
		<span>Import</span>
	</Button>
</ActionBar>

{#each players as player (player.id)}
	<PlayerRow
		{players}
		bind:player
		on:removePlayer={(event) => removePlayer(event.detail)}
	/>
{/each}
