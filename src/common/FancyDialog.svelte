<script lang="ts">
	import { onMount, onDestroy } from "svelte";

	import Dialog from "smelte/src/components/Dialog";

	export let showDialog = false;
	export let small = false;

	$: {
		if (showDialog) {
			document.body.classList.add("noscroll");
		} else {
			document.body.classList.remove("noscroll");
		}
	}
</script>

<Dialog bind:value={showDialog} classes={(c) => c + " m-2"}>
	<slot name="title" slot="title" />

	<div class="dialog-content{small ? ' small' : ''}">
		<slot />
	</div>

	<slot name="actions" slot="actions" />
</Dialog>

<style lang="scss">
	.dialog-content {
		max-height: 80vh;
		max-width: 80vw;
		overflow: auto;

		&.small {
			max-width: 30rem;
		}

		> p {
			padding-bottom: 0.5rem;
		}
	}

	// TODO: this probably belongs somewhere else
	:global(body.noscroll) {
		overflow: hidden;
		// padding-right: 12px;
	}
</style>
