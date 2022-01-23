<script lang="ts">
	import Button from "smelte/src/components/Button";
	import dark from "smelte/src/dark";

	const darkMode = dark();
</script>

<Button bind:value={$darkMode}>Toggle dark mode</Button>
