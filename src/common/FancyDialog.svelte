<script lang="ts">
	import Dialog from "smelte/src/components/Dialog";

	export let showDialog = true;
</script>

<Dialog bind:value={showDialog} classes={(c) => c + " m-2"}>
	<slot name="title" slot="title"></slot>

	<slot></slot>

	<slot name="actions" slot="actions"></slot>
</Dialog>

<style>
	.dialog-content {
		max-height: 80vh;
		max-width: 30rem;
		overflow: auto;
	}
</style>
	<