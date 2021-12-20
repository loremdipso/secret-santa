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
	export let isOneWay = true;
	export let open = true;

	let exclusions = [];
	let reverseExclusions = [];
	$: {
		exclusions = [...(findPlayerById(players, playerId)?.exclusions || [])];

		if (isOneWay) {
			reverseExclusions = [];
		} else {
			let temp = [];
			for (let exclusion of exclusions) {
				let player = findPlayerById(players, exclusion);
				if (player.exclusions.indexOf(playerId) > -1) {
					temp.push(exclusion);
				}
			}
			reverseExclusions = temp;
		}
	}

	let dispatch = createEventDispatcher();

	function updatePlayerExclusions() {
		dispatch("updateExclusions", {
			playerId,
			exclusions,
			reverseExclusions,
		});
	}

	function toggleChecked(event, otherPlayerId: number) {
		let index = exclusions.indexOf(otherPlayerId);
		let reverseIndex = reverseExclusions.indexOf(otherPlayerId);

		if (isOneWay) {
			if (index === -1) {
				exclusions.push(otherPlayerId);
			} else {
				exclusions.splice(index, 1);
			}
		} else {
			if (index > -1 && reverseIndex > -1) {
				// both has it, so remove from both
				if (index > -1) {
					exclusions.splice(index, 1);
				}
				if (reverseIndex > -1) {
					reverseExclusions.splice(reverseIndex, 1);
				}
			} else {
				// at least one doesn't have it, so add to both
				if (index === -1) {
					exclusions.push(otherPlayerId);
				}
				if (reverseIndex === -1) {
					reverseExclusions.push(otherPlayerId);
				}
			}
		}
		console.log({ exclusions, reverseExclusions });
	}

	function isChecked(playerId: number): boolean {
		if (isOneWay) {
			return exclusions.some((exclusion) => exclusion === playerId);
		} else {
			return (
				exclusions.some((exclusion) => exclusion === playerId) &&
				reverseExclusions.some((exclusion) => exclusion === playerId)
			);
		}
	}
	function isIndeterminate(playerId: number): boolean {
		if (isOneWay) {
			return false;
		} else {
			let a = exclusions.some((exclusion) => exclusion === playerId);
			let b = reverseExclusions.some(
				(exclusion) => exclusion === playerId
			);
			return (a && !b) || (!a && b);
		}
	}
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
							checked={isChecked(player.id)}
							indeterminate={isIndeterminate(player.id)}
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
