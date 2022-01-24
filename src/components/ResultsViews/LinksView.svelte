<script lang="ts">
	import DataTable from "smelte/src/components/DataTable";
	import type { IEntry } from "../../interfaces";
	export let entries: IEntry[];
</script>

<DataTable
	data={entries}
	columns={[
		{
			field: "name",
			class: "md:w-10",
			value: (entry) => entry.player.name,
		},
		{
			field: "url",
			class: "md:w-10",
			value: (entry) => entry.url,
			headerRemove: "justify-end",
		},
	]}
/>
