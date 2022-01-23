<script lang="ts">
	import Snackbar from "smelte/src/components/Snackbar";

	let showSnackbar = false;
	let snackbarMessage: string;

	// TODO: implement queue

	export function pop(message: string) {
		snackbarMessage = message;
		showSnackbar = true;
	}
</script>

<Snackbar top color="alert" bind:value={showSnackbar}>
	<div>{snackbarMessage}</div>
</Snackbar>
