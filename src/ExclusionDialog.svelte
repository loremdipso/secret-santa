<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Dialog, { Title, Content, Actions } from "@smui/dialog";
	import Checkbox from "@smui/checkbox";
	import FormField from "@smui/form-field";
	import Button, { Label } from "@smui/button";
	import { IPlayer } from "./interfaces";
	import { findPlayerById } from "./helpers";

	export let players: IPlayer[];
	export let playerId: number;
	export let open = true;

	let dispatch = createEventDispatcher();

	function updatePlayerExclusions() {
		dispatch("updateExclusions", exclusions);
	}

	function toggleChecked(event, playerId: number) {
		console.log({ event, playerId });
		let index = exclusions.indexOf(playerId);
		if (index === -1) {
			exclusions.push(playerId);
		} else {
			exclusions.splice(index, 1);
		}
	}

	$: exclusions = [...(findPlayerById(players, playerId)?.exclusions || [])];
</script>

<Dialog
	bind:open
	aria-labelledby="simple-title"
	aria-describedby="simple-content"
>
	<!-- Title cannot contain leading whitespace due to mdc-typography-baseline-top() -->
	<Title id="simple-title">Select Exclusions</Title>
	<Content id="simple-content">
		<div class="list">
			{#each players as player}
				{#if player.name.length && player.id !== playerId}
					<FormField>
						<Checkbox
							checked={exclusions.some(
								(exclusion) => exclusion === player.id
							)}
							on:click={(event) =>
								toggleChecked(event, player.id)}
						/>
						<span slot="label">{player.name}</span>
					</FormField>
				{/if}
			{/each}
		</div>
	</Content>
	<Actions>
		<Button variant="raised">
			<Label>Discard</Label>
		</Button>
		<Button on:click={() => updatePlayerExclusions()} variant="raised">
			<Label>Save</Label>
		</Button>
	</Actions>
</Dialog>

<style lang="scss">
	.list {
		display: flex;
		flex-direction: column;
	}
</style>
