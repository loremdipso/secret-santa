<script lang="ts">
	import PlayerRow from "./PlayerRow.svelte";
	import { IPlayer } from "./interfaces";
	import Radio from "@smui/radio";
	import FormField from "@smui/form-field";
	import { getPlayerId } from "./helpers";
	import Button, { Label } from "@smui/button";
	import ExclusionDialog from "./ExclusionDialog.svelte";

	let players: IPlayer[] = [];
	for (let i = 0; i < 5; i++) {
		players.push({
			name: `Player ${i}`,
			id: getPlayerId(),
			exclusions: [i + 1],
			email: "",
			address: "",
		});
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

	// exclusion dialog state
	let showExclusionDialog = false;
	let currentPlayerId = -1;

	let excludeOneWay = false;

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

<div class="actions">
	<Button variant="unelevated" color="secondary" disabled={!canCalculate}>
		<Label>Calculate</Label>
	</Button>

	<Button variant="unelevated" color="secondary">
		<Label>Import</Label>
	</Button>

	<div class="exclude-container">
		<FormField>
			<Radio bind:group={excludeOneWay} value={false} touch />
			<span slot="label">Exclude is one-way</span>
		</FormField>
		<FormField>
			<Radio bind:group={excludeOneWay} value={true} touch />
			<span slot="label">Exclude goes both ways</span>
		</FormField>
	</div>
</div>

<div class="player-cards">
	{#each players as player}
		<PlayerRow
			{players}
			bind:player
			on:removePlayer={(event) => removePlayer(event.detail)}
			on:updateExclusions={(event) => {
				currentPlayerId = event.detail;
				showExclusionDialog = true;
			}}
		/>
	{/each}
</div>

<ExclusionDialog
	bind:open={showExclusionDialog}
	{players}
	playerId={currentPlayerId}
/>

<style lang="scss">
	.player-cards > :global(*) {
		margin: 10px;
		background-color: rgb(63, 63, 63);
	}

	.actions {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		background-color: rgb(63, 63, 63);
		> :global(*) {
			margin-right: 5px;
		}
	}

	.exclude-container {
		display: flex;
		flex-direction: column;
	}
</style>
