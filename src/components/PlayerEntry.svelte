<script lang="ts">
	import { createEventDispatcher } from "svelte";
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

	let dispatch = createEventDispatcher();

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
		classes="ml-auto mr-auto m-1"
		title="Import"
		on:click={() => dispatch("import")}
	/>

	<Button
		color="success"
		disabled={!canCalculate}
		on:click={() => dispatch("calculate")}
	>
		Calculate
	</Button>
</Fabulous>

{#each players as player (player.id)}
	<PlayerRow
		{players}
		bind:player
		on:removePlayer={(event) => removePlayer(event.detail)}
	/>
{/each}
