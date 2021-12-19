<script lang="ts">
	import Button, { Label } from "@smui/button";
	import IconButton from "@smui/icon-button";
	import Card, { Content } from "@smui/card";
	import FormField from "@smui/form-field";
	import Switch from "@smui/switch";
	import PlayerRow from "./PlayerRow.svelte";
	import { IPlayer } from "./players";
	import Radio from "@smui/radio";
	import FormField from "@smui/form-field";

	let name: string = "world";
	let players: IPlayer[] = [];

	for (let i = 0; i < 100; i++) {
		players.push({ name: `${i}` });
	}

	let excludeOneWay = false;
</script>

<div class="actions">
	<div class="exclude-container">
		<FormField>
			<FormField>
				<Radio bind:group={excludeOneWay} value={false} touch />
				<span slot="label">Exclude one-way</span>
			</FormField>
		</FormField>
		<FormField>
			<FormField>
				<Radio bind:group={excludeOneWay} value={true} touch />
				<span slot="label">Exclude both ways</span>
			</FormField>
		</FormField>
	</div>
</div>

{#each players as player}
	<PlayerRow {player} />
	{player.name}
{/each}

<style lang="scss">
	.exclude-container {
		display: flex;
		flex-direction: column;
	}
</style>
