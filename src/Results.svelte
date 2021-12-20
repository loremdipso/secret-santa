<script lang="ts">
	import Button, { Label } from "@smui/button";
	import Textfield from "@smui/textfield";
	import Tab from "@smui/tab";
	import TabBar from "@smui/tab-bar";
	import { IPlayer, IEntry } from "./interfaces";
	import { calculateLinkUrl, playerIsEmpty } from "./helpers";

	export let players: IPlayer[];
	export let showPlayerEntry: boolean;

	const LINKS_VIEW = "Links view";
	const RAW_LINKS_VIEW = "Raw links view";
	const EMAIL_VIEW = "Email view";

	let active: string = LINKS_VIEW;

	console.log({ players });

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

	let subjectLine: string = "";

	function doRecalculate() {
		// TODO
	}

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
</script>

<div class="actions-bar">
	<div>
		<Textfield
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
			<Label>Back to Edit</Label>
		</Button>

		<Button
			variant="unelevated"
			color="secondary"
			on:click={() => doRecalculate()}
		>
			<Label>Recalculate</Label>
		</Button>

		<Button
			variant="unelevated"
			color="secondary"
			on:click={() => doExport()}
		>
			<Label>Export</Label>
		</Button>
	</div>
</div>

<TabBar let:tab bind:active tabs={[EMAIL_VIEW, LINKS_VIEW, RAW_LINKS_VIEW]}>
	<Tab {tab}>
		<Label>{tab}</Label>
	</Tab>
</TabBar>

{#if active === LINKS_VIEW}
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
{:else if active === RAW_LINKS_VIEW}
	<Button
		variant="unelevated"
		color="secondary"
		on:click={() => copyToClipboard()}
	>
		<Label>Copy to Clipboard</Label>
	</Button>
	<textarea style="width: 100%; height: 300px">{getRawTextContent()}</textarea
	>
{:else if active === EMAIL_VIEW}
	<Button variant="unelevated" color="secondary" on:click={() => showAll()}>
		<Label>Show all</Label>
	</Button>

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
{/if}

<style lang="scss">
	.actions-bar {
		display: flex;
		flex-direction: column;
		> :global(div) {
			flex-grow: 1;
		}
	}
</style>
