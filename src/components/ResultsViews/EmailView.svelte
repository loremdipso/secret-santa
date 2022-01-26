<script lang="ts">
	import Button from "smelte/src/components/Button";
	import TextField from "smelte/src/components/TextField";

	import type { IEntry } from "../../interfaces";
	export let entries: IEntry[];

	let subjectLine: string = "Secret Santa";
	let showAll: boolean = false;

	function toggleShowAll() {
		showAll = !showAll;
	}
</script>

<!-- TODO: implement email support -->
<!-- <TextField
	style="width: 100%"
	bind:value={subjectLine}
	label="Subject line for emails"
/> -->

<div class="flex justify-end">
	<Button on:click={() => toggleShowAll()}>{showAll ? "Hide" : "Show"}</Button
	>
</div>

<table class="padded-table table-fixed w-full border">
	<thead>
		<th>Gifter</th>
		<th>Giftee</th>
		<th>Url</th>
	</thead>

	<tbody>
		{#each entries as entry}
			<tr
				class="hover:bg-gray-50 dark-hover:bg-dark-400 border-gray-200 dark:border-gray-400 border-t border-b"
			>
				<td
					title={entry.gifter.name}
					class="overflow-hidden overflow-ellipsis whitespace-nowrap"
				>
					{entry.gifter.name}
				</td>

				<td
					title={showAll
						? entry.gifter.name
						: 'Click the "Show" button above to reveal'}
					class="overflow-hidden overflow-ellipsis whitespace-nowrap"
				>
					{showAll ? entry.giftee.name : "######"}
				</td>

				<td
					title={entry.url}
					class="overflow-hidden overflow-ellipsis text-center"
				>
					<a class="text-blue-200" target="#" href={entry.url}>
						Link
					</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>

<style lang="scss">
	.padded-table {
		td,
		th {
			padding: 1rem;
		}

		td:last-child,
		th:last-child {
			width: 5rem;
		}
	}
</style>
