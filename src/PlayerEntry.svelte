<script lang="ts">
	import PlayerRow from "./PlayerRow.svelte";
	import { IPlayer } from "./interfaces";
	import { findPlayerById, getPlayerId } from "./helpers";
	import Button, { Label } from "@smui/button";
	import ExclusionDialog from "./ExclusionDialog.svelte";

	export let players: IPlayer[];
	export let showPlayerEntry: boolean;

	function removeUnusedExclusions() {
		for (let player of players) {
			player.exclusions = player.exclusions.filter((exclusion) =>
				players.some((player) => player.id === exclusion)
			);
		}
		players = players;
	}
	removeUnusedExclusions();

	function updateExclusions(
		playerId: number,
		exclusions: number[],
		reverseExclusions: number[]
	) {
		console.log({ exclusions, reverseExclusions });
		findPlayerById(players, playerId).exclusions = exclusions;
		if (!isOneWay) {
			// strategy: run through reverse exclusions, update changes
			for (let player of players) {
				if (player.id !== playerId) {
					if (
						// exclusions exists in state
						player.exclusions.indexOf(playerId) > -1 &&
						// ...but shouldn't
						reverseExclusions.indexOf(player.id) === -1
					) {
						// remove it
						player.exclusions.splice(
							player.exclusions.indexOf(playerId),
							1
						);
						console.log(
							`removing ${playerId} from ${player.id}'s exclusions`
						);
					} else if (
						// exclusions doesn't exist in state
						player.exclusions.indexOf(playerId) === -1 &&
						// ...but should
						reverseExclusions.indexOf(player.id) > -1
					) {
						// add it
						player.exclusions.push(playerId);
						console.log(
							`adding ${playerId} from ${player.id}'s exclusions`
						);
					}
				}
			}
		}
		players = players;
	}

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

	// exclusion dialog state
	let showExclusionDialog = false;
	let currentPlayerId = -1;

	let isOneWay = false;

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
		<Label>Calculate</Label>
	</Button>

	<Button variant="unelevated" color="secondary">
		<Label>Import</Label>
	</Button>
</div>

<div class="player-cards">
	{#each players as player}
		<PlayerRow
			{players}
			bind:player
			on:removePlayer={(event) => removePlayer(event.detail)}
			on:updateExclusionsOneWay={(event) => {
				isOneWay = true;
				currentPlayerId = event.detail;
				showExclusionDialog = true;
			}}
			on:updateExclusionsTwoWay={(event) => {
				isOneWay = false;
				currentPlayerId = event.detail;
				showExclusionDialog = true;
			}}
		/>
	{/each}
</div>

{#if showExclusionDialog}
	<ExclusionDialog
		bind:open={showExclusionDialog}
		on:updateExclusions={(event) =>
			updateExclusions(
				event.detail.playerId,
				event.detail.exclusions,
				event.detail.reverseExclusions
			)}
		{isOneWay}
		{players}
		playerId={currentPlayerId}
	/>
{/if}

<style lang="scss">
	.player-cards > :global(*) {
		margin: 10px;
		background-color: rgb(63, 63, 63);
	}

	.actions-bar {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		> :global(*) {
			margin-right: 5px;
		}
	}
</style>
