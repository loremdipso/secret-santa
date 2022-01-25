<script lang="ts">
	import type { IEntry } from "../../interfaces";
	export let entries: IEntry[];
</script>

<table class="table-fixed w-full max-w-3xl border ml-auto mr-auto">
	<thead>
		<th>Gifter</th>
		<th>Link</th>
	</thead>

	<tbody>
		{#each entries as entry}
			<tr
				class="hover:bg-gray-50 dark-hover:bg-dark-400 border-gray-200 dark:border-gray-400 border-t border-b"
			>
				<td>
					{entry.gifter.name}
				</td>

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
