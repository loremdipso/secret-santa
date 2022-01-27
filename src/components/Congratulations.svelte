<script lang="ts">
	import { decodeLinkUri, playerIsEmpty } from "../helpers";
	import type { IPlayer } from "../interfaces";

	export let secret: string;

	let player: IPlayer;
	$: player = decodeLinkUri(secret);
</script>

<h5 class="w-full text-center pb-3">
	{player.name} needs a gift!
</h5>

<table class="padded-table w-full table-fixed border">
	{#if player.email}
		<tr>
			<td>Email:</td>
			<td
				title={player.email}
				class="overflow-hidden overflow-ellipsis whitespace-nowrap"
			>
				<a target="#" href="mailto:{player.email}">{player.email}</a>
			</td>
		</tr>
	{/if}

	{#if player.address}
		<tr>
			<td>Address:</td>
			<td
				title={player.address}
				class="overflow-hidden overflow-ellipsis whitespace-nowrap"
			>
				{player.address}
			</td>
		</tr>
	{/if}
</table>
