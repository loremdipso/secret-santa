<script lang="ts">
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	import PlayerRow from "./PlayerRow.svelte";
	import type { IPlayer } from "../interfaces";
	import ActionBar from "../common/ActionBar.svelte";
	import SmallButton from "../common/SmallButton.svelte";

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

	let canCalculate = false;
	$: {
		// can't have a game with fewer than 3 entries (one is null)
		if (players.length < 3) {
			canCalculate = false;
		} else {
			canCalculate = true;
			for (let i = 0; i < players.length - 1; i++) {
				let player = players[i];
				if (player.name.length === 0) {
					canCalculate = false;
					break;
				}
				// TODO: validate email if it's provided
			}
		}
	}
</script>

<ActionBar>
	<SmallButton
		color="blue"
		icon="file_upload"
		on:click={() => dispatch("import")}
		title="Import"
	/>

	<SmallButton
		color="success"
		reverse
		disabled={!canCalculate}
		on:click={() => dispatch("calculate")}
		icon="arrow_forward"
		title="Calculate"
	/>
</ActionBar>

{#each players as player (player.id)}
	<div class="p-5" transition:slide|local={{ duration: 300 }}>
		<PlayerRow
			{players}
			bind:player
			on:removePlayer={(event) => removePlayer(event.detail)}
		/>
	</div>
{/each}
