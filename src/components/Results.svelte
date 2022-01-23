<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "smelte/src/components/Button";
	import TextField from "smelte/src/components/TextField";
	import Tabs from "smelte/src/components/Tabs";

	// TODO: why doesn't this import work?
	// import Tab from "smelte/src/components/Tabs/Tab";
	import { Tab } from "smelte";

	import type { IPlayer, IEntry, IResultPair } from "../interfaces";
	import { calculateLinkUrl, getMatchups, playerIsEmpty } from "../helpers";
	import ActionBar from "./ActionBar.svelte";

	export let players: IPlayer[];
	export let matchups: IResultPair[];
	export let showPlayerEntry: boolean;

	const LINKS_VIEW = { id: "1", text: "Links view" };
	const RAW_LINKS_VIEW = { id: "2", text: "Raw links view" };
	const EMAIL_VIEW = { id: "3", text: "Email view" };
	const items = [LINKS_VIEW, RAW_LINKS_VIEW, EMAIL_VIEW];
	let selected;

	let active: string = LINKS_VIEW.id;

	$: entries = generateEntries();

	function generateEntries(): IEntry[] {
		let rv = [];
		for (let player of players) {
			if (!playerIsEmpty(player)) {
				rv.push({ player, url: calculateLinkUrl(player) });
			}
		}
		return rv;
	}

	let subjectLine: string = "Secret Santa";

	function doExport() {
		// TODO
	}

	function copyToClipboard() {
		// TODO
	}

	function showAll() {
		// TODO
	}

	function getRawTextContent(): string {
		let rv = "";
		for (let i = 0; i < entries.length; i++) {
			let entry = entries[i];
			if (i > 0) {
				rv += "\n\n";
			}
			rv += entry.player.name;
			rv += "\n";
			rv += entry.url;
		}
		return rv;
	}

	let dispatch = createEventDispatcher();
</script>

<ActionBar>
	<div>
		<TextField
			style="width: 100%"
			bind:value={subjectLine}
			label="Subject line for emails"
		/>
	</div>

	<div>
		<Button
			variant="unelevated"
			color="secondary"
			on:click={() => (showPlayerEntry = true)}
		>
			Back to Edit
		</Button>

		<Button
			variant="unelevated"
			color="secondary"
			on:click={() => dispatch("calculate")}
		>
			Recalculate
		</Button>

		<Button
			variant="unelevated"
			color="secondary"
			on:click={() => dispatch("export")}
		>
			Export
		</Button>
	</div>
</ActionBar>

<Tabs selected="1" let:selected bind:active {items}>
	<div
		slot="content"
		class="flex items-center content-center overflow-hidden w-full bg-gray-900 h-full"
		style="height: 250px"
	>
		<Tab id={LINKS_VIEW.id} {selected}>
			<table>
				<tr>
					<th>Gifter</th>
					<th>Link</th>
				</tr>
				{#each entries as entry}
					<tr>
						<td>{entry.player.name}</td>
						<td>
							<a href={entry.url}>Link</a>
						</td>
					</tr>
				{/each}
			</table>
		</Tab>
		<Tab id={RAW_LINKS_VIEW.id} {selected}>
			<Button
				variant="unelevated"
				color="secondary"
				on:click={() => copyToClipboard()}
				label="Copy to Clipboard"
			/>
			<textarea style="width: 100%; height: 300px"
				>{getRawTextContent()}</textarea
			>
		</Tab>
		<Tab id={EMAIL_VIEW.id} {selected}>
			<Button
				variant="unelevated"
				color="secondary"
				on:click={() => showAll()}
				label="Show all"
			/>

			<table>
				<tr>
					<th>Gifter</th>
					<th>Giftee</th>
				</tr>
				{#each entries as entry}
					<tr>
						<td>{entry.player.name}</td>
						<td>######</td>
					</tr>
				{/each}
			</table>
		</Tab>
	</div>
</Tabs>
<!-- <style lang="scss">
	.actions-bar {
		display: flex;
		flex-direction: column;
		> :global(div) {
			flex-grow: 1;
		}
	}
</style> -->
