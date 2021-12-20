<script lang="ts">
	import Dialog, { Title, Content, Actions } from "@smui/dialog";
	import Checkbox from "@smui/checkbox";
	import FormField from "@smui/form-field";
	import Button, { Label } from "@smui/button";
	import { IPlayer } from "./interfaces";
	import { findExclusionsForPlayer, findPlayerById } from "./helpers";

	export let players: IPlayer[];
	export let playerId: number;
	export let open = true;

	function updatePlayerExclusions() {
		// TODO
	}

	function toggleChecked(event, playerId: number) {
		//
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
						<!-- <Checkbox bind:checked /> -->
						<Checkbox
							checked={exclusions.some(
								(exclusion) => exclusion === player.id
							)}
							on:checked={(event) =>
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
