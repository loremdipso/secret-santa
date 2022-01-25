<script lang="ts">
	import { createEventDispatcher } from "svelte";

	import Button from "smelte/src/components/Button";
	import Dialog from "smelte/src/components/Dialog";

	export let showDialog = true;

	let dispatch = createEventDispatcher();
</script>

<Dialog bind:value={showDialog} classes={(c) => c + " m-2"}>
	<div class="dialog-content">
		Should I include exclusions from this year? (Recommended yes. Otherwise
		people next year might get each other again)
	</div>

	<div slot="actions">
		<Button
			text
			on:click={() => {
				dispatch("export-basic");
				showDialog = false;
			}}
		>
			No, thank you
		</Button>
		<Button
			color="success"
			on:click={() => {
				dispatch("export-progressive");
				showDialog = false;
			}}
		>
			Yes please
		</Button>
	</div>
</Dialog>

<style>
	.dialog-content {
		max-height: 80vh;
		max-width: 30rem;
		overflow: auto;
	}
</style>
