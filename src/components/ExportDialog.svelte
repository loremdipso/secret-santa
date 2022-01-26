<script lang="ts">
	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

	import Button from "smelte/src/components/Button";

	import FancyDialog from "../common/FancyDialog.svelte";

	export let showDialog = true;
</script>

<FancyDialog bind:showDialog>
	<p>Should I include exclusions from this year?</p>

	<p>
		I'd recommend you do. Otherwise people next year might get each other
		again.
	</p>

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
</FancyDialog>
