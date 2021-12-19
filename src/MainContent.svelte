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
		players.push({ name: `${i}`, excluding: ["1", "2", "3"] });
	}

	let excludeOneWay = false;
	let canCalculate = false;
</script>

<div class="actions">
	<!-- <Button on:click={() => clicked++} variant="unelevated"> -->
	<Button variant="unelevated" color="secondary" disabled={!canCalculate}>
		<Label>Calculate</Label>
	</Button>

	<Button variant="unelevated" color="secondary" disabled={!canCalculate}>
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

{#each players as player}
	<PlayerRow bind:player />
	{player.name}
	{player.excluding.length}
{/each}

<style lang="scss">
	.actions {
		display: flex;
		flex-direction: row;
	}

	.exclude-container {
		display: flex;
		flex-direction: column;
	}
</style>
