<script lang="ts">
	import Button, { Label } from "@smui/button";
	import IconButton from "@smui/icon-button";
	import Card, { Content } from "@smui/card";
	import Switch from "@smui/switch";
	import PlayerRow from "./PlayerRow.svelte";
	import { IPlayer } from "./players";
	import Radio from "@smui/radio";
	import FormField from "@smui/form-field";

	let name: string = "world";
	let players: IPlayer[] = [];

	for (let i = 0; i < 100; i++) {
		players.push({
			name: `${i}`,
			excluding: ["1", "2", "3"],
			email: "",
			address: "",
		});
	}

	let excludeOneWay = false;
	$: canCalculate = !players.some((player) => player.name.length === 0);
</script>

<div class="actions">
	<!-- <Button on:click={() => clicked++} variant="unelevated"> -->
	<Button variant="unelevated" color="secondary" disabled={!canCalculate}>
		<Label>Calculate</Label>
	</Button>

	<Button variant="unelevated" color="secondary">
		<Label>Import</Label>
	</Button>

	<div class="exclude-container">
		<FormField>
			<Radio bind:group={excludeOneWay} value={false} touch />
			<span slot="label">Exclude one-way</span>
		</FormField>
		<FormField>
			<Radio bind:group={excludeOneWay} value={true} touch />
			<span slot="label">Exclude both ways</span>
		</FormField>
	</div>
</div>

<div class="player-cards">
	{#each players as player}
		<PlayerRow bind:player />
	{/each}
</div>

<style lang="scss">
	.player-cards > :global(*) {
		margin: 10px;
		background-color: rgb(63, 63, 63);
	}

	.actions {
		display: flex;
		flex-direction: row;
	}

	.exclude-container {
		display: flex;
		flex-direction: column;
	}
</style>
