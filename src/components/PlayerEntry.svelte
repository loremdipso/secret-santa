<script lang="ts">
	import { slide } from "svelte/transition";
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	import Button from "smelte/src/components/Button";

	import PlayerRow from "./PlayerRow.svelte";
	import type { IPlayer } from "../interfaces";
	import Fabulous from "../common/Fabulous.svelte";

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

<Fabulous>
	<Button
		color="blue"
		icon="file_upload"
		classes="ml-auto mr-auto mb-1"
		title="Import"
		on:click={() => dispatch("import")}>Import</Button
	>

	<Button
		color="success"
		disabled={!canCalculate}
		on:click={() => dispatch("calculate")}
		classes="flex flex-row-reverse"
		icon="arrow_forward"
	>
		Calculate
	</Button>
</Fabulous>

{#each players as player (player.id)}
	<div class="p-5" transition:slide|local={{ duration: 300 }}>
		<PlayerRow
			{players}
			bind:player
			on:removePlayer={(event) => removePlayer(event.detail)}
		/>
	</div>
{/each}
