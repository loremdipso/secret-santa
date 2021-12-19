<script lang="ts">
	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";
	import IconButton from "@smui/icon-button";
	import { Icon } from "@smui/common";
	import { IPlayer } from "./players";

	export let player: IPlayer;

	let remove_exclusion = (exclusionToRemove: string) => {
		player.excluding = player.excluding.filter(
			(exclusion) => exclusion !== exclusionToRemove
		);
	};
</script>

<div class="container">
	<div class="text-container">
		<Textfield bind:value={player.name} label="Name" />

		<Textfield bind:value={player.email} type="email">
			<svelte:fragment slot="label">
				<Icon
					class="material-icons"
					style="font-size: 1em; line-height: normal; vertical-align: top;"
					>email</Icon
				>
				Email (optional)
			</svelte:fragment>
		</Textfield>

		<Textfield
			bind:value={player.address}
			label="Mailing address (optional)"
		/>

		<Button
			variant="unelevated"
			color="secondary"
			title="Select players that this player should not be paired with"
		>
			<Label>Add exclusions</Label>
		</Button>
	</div>

	<div class="exclusions-container">
		{#each player.excluding as exclusion}
			<div>
				<div class="exclusion">
					<IconButton
						size="button"
						class="material-icons remove-button"
						title="Remove this exclusion"
						on:click={() => remove_exclusion(exclusion)}
						>close</IconButton
					>
					<Label>{exclusion}</Label>
				</div>
			</div>
		{/each}
	</div>
</div>

<style lang="scss">
	.container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.text-container {
		padding: 10px;
		display: flex;
		flex-direction: column;
		width: 400px;
	}

	.exclusions-container {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
	}

	.exclusion {
		display: flex;
		align-items: center;
		margin: 10px;
		background-color: black;

		> :global(span) {
			padding-right: 10px;
			padding-left: 10px;
		}

		> :global(.remove-button) {
			background-color: red;
		}
	}
</style>
