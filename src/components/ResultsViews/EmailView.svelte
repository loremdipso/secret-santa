<script lang="ts">
	import Button from "smelte/src/components/Button";
	import TextField from "smelte/src/components/TextField";

	import type { IEntry } from "../../interfaces";
	import PlayerEntry from "../PlayerEntry.svelte";
	export let entries: IEntry[];

	let subjectLine: string = "Secret Santa";
	let showAll: boolean = false;

	function toggleShowAll() {
		showAll = !showAll;
	}
</script>

<div>
	<TextField
		style="width: 100%"
		bind:value={subjectLine}
		label="Subject line for emails"
	/>
	<Button color="secondary" on:click={() => toggleShowAll()}>Show all</Button>
</div>

<table class="table-fixed w-full max-w-3xl border ml-auto mr-auto">
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
				<td>
					{entry.gifter.name}
				</td>

				<td>{showAll ? entry.giftee.name : "######"}</td>

				<td
					title={entry.url}
					class="overflow-hidden overflow-ellipsis text-center"
				>
					<a target="#" href={entry.url}>Link</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
