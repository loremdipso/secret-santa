<script lang="ts">
	import type { IEntry } from "../../interfaces";
	export let entries: IEntry[];
</script>

<table>
	<thead>
		<th>Name</th>
		<th>Url</th>
	</thead>
	<tbody>
		{#each entries as entry}
			<tr>
				<td>
					{entry.player.name}
				</td>

				<td
					title={entry.url}
					class="overflow-hidden overflow-ellipsis max-w-md"
				>
					<a href={entry.url}>{entry.url}</a>
				</td>
			</tr>
		{/each}
	</tbody>
</table>
