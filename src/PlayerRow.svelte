<script lang="ts">
	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";
	import { IPlayer } from "./players";

	export let player: IPlayer;

	let remove_exclusion = (exclusionToRemove: string) => {
		player.excluding = player.excluding.filter(
			(exclusion) => exclusion !== exclusionToRemove
		);
	};
</script>

<div class="container">
	<Textfield bind:value={player.name} label="Name">
		<!-- <HelperText slot="helper">Helper Text</HelperText> -->
	</Textfield>

	<Button variant="unelevated" color="secondary">
		<Label>Exclude</Label>
	</Button>

	{#each player.excluding as exclusion}
		<Button
			variant="unelevated"
			color="secondary"
			on:click={() => remove_exclusion(exclusion)}
		>
			<Label>{exclusion}</Label>
		</Button>
	{/each}
</div>

<style lang="scss">
	.container {
		background-color: black;
		padding: 10px;
	}
</style>
