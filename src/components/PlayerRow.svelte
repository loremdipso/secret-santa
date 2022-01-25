<script lang="ts">
	import Button from "smelte/src/components/Button";
	import TextField from "smelte/src/components/TextField";

	import ExclusionDialog from "./ExclusionDialog.svelte";
	import { createEventDispatcher } from "svelte";
	import type { IPlayer } from "../interfaces";
	import { findPlayerById } from "../helpers";

	export let player: IPlayer;
	export let players: IPlayer[];

	function updateExclusions(
		playerId: number,
		exclusions: number[],
		reverseExclusions: number[]
	) {
		console.log({ exclusions, reverseExclusions });
		findPlayerById(players, playerId).exclusions = exclusions;
		players = players;
	}

	// exclusion dialog state
	let currentPlayerId = -1;

	let dispatch = createEventDispatcher();

	let showExclusionDialog = false;

	let remove_exclusion = (exclusionToRemove: number) => {
		player.exclusions = player.exclusions.filter(
			(exclusion) => exclusion !== exclusionToRemove
		);
	};
</script>

<div class="player-row-container">
	{#if player.id !== players[players.length - 1].id}
		<div class="remove-player-button">
			<Button
				small
				title="Remove this player from the game"
				icon="close"
				on:click={() => dispatch("removePlayer", player.id)}
			/>
		</div>
	{/if}

	<div class="text-container">
		<TextField dense bind:value={player.name} label="Name" />

		<TextField
			dense
			bind:value={player.email}
			type="email"
			label="Email (optional)"
			prepend="email"
		/>

		<TextField
			dense
			bind:value={player.address}
			label="Mailing address (optional)"
		/>

		<Button
			variant="unelevated"
			color="secondary"
			title="Select players that this player should not give gifts to"
			on:click={() => {
				showExclusionDialog = true;
				currentPlayerId = player.id;
			}}
		>
			Who should I <b>not</b> give gifts to?
		</Button>
	</div>

	<div class="exclusions-container flex flex-col bg-black grow p-3">
		<h5>Exclusions</h5>
		<div class="flex flex-row">
			{#each player.exclusions as exclusion}
				<Button
					title="Remove this exclusion"
					remove="p-4"
					replace={{ "px-4": "p-2" }}
					on:click={() => remove_exclusion(exclusion)}
					icon="close"
				>
					{findPlayerById(players, exclusion)?.name ||
						"BAD EXCLUSION"}
				</Button>
			{/each}
		</div>
	</div>
</div>

{#if showExclusionDialog}
	<ExclusionDialog
		bind:showDialog={showExclusionDialog}
		on:updateExclusions={(event) =>
			updateExclusions(
				event.detail.playerId,
				event.detail.exclusions,
				event.detail.reverseExclusions
			)}
		{players}
		playerId={currentPlayerId}
	/>
{/if}

<style>
	.player-row-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		position: relative;
		margin: 30px 20px 30px 20px;
		background-color: rgb(63, 63, 63);
	}

	.text-container {
		padding: 10px;
		display: flex;
		flex-direction: column;
		width: 400px;
	}

	/* @Hacky */
	.text-container > :global(div) {
		margin-bottom: 0.2rem !important;
	}

	.exclusions-container {
		/* TODO: why doesn't flex-1 this work? */
		flex-grow: 1;
	}

	.remove-player-button {
		position: absolute;
		right: 0;
		top: 0;
		z-index: 1;
		transform: translateY(-25%) translateX(25%);
	}
</style>
