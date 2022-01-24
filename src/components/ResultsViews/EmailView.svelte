<script lang="ts">
	import DataTable from "smelte/src/components/DataTable";
	import Button from "smelte/src/components/Button";

	import type { IEntry } from "../../interfaces";
	export let entries: IEntry[];

	function showAll() {
		// TODO
	}
</script>

<Button variant="unelevated" color="secondary" on:click={() => showAll()}>
	Show all
</Button>

<DataTable
	data={entries}
	columns={[
		{
			field: "gifter",
			class: "md:w-10",
			value: (entry) => entry.player.name,
		},
		{
			field: "giftee",
			class: "md:w-10",
			value: (entry) => "######",
		},
		{
			field: "url",
			class: "md:w-10",
			value: (entry) => entry.url,
			headerRemove: "justify-end",
		},
	]}
/>
