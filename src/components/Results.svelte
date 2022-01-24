<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "smelte/src/components/Button";
	import TextField from "smelte/src/components/TextField";
	import Tabs from "smelte/src/components/Tabs";

	// TODO: why doesn't this import work?
	// import Tab from "smelte/src/components/Tabs/Tab";
	import { Tab } from "smelte";

	import type { IPlayer, IEntry, IResultPair } from "../interfaces";
	import { calculateLinkUrl, playerIsEmpty } from "../helpers";
	import ActionBar from "./ActionBar.svelte";
	import RawLinksView from "./ResultsViews/RawLinksView.svelte";
	import LinksView from "./ResultsViews/LinksView.svelte";
	import EmailView from "./ResultsViews/EmailView.svelte";

	export let players: IPlayer[];
	export let matchups: IResultPair[];
	export let showPlayerEntry: boolean;

	const LINKS_VIEW = { id: "1", text: "Links view" };
	const RAW_LINKS_VIEW = { id: "2", text: "Raw links view" };
	const EMAIL_VIEW = { id: "3", text: "Email view" };
	const items = [LINKS_VIEW, RAW_LINKS_VIEW, EMAIL_VIEW];

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

	<div class="flex flex-wrap justify-around flex-col sm:flex-row">
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
	<div slot="content" class="absolute w-full p-2 whitespace-pre">
		<Tab id={LINKS_VIEW.id} {selected}>
			<LinksView bind:entries />
		</Tab>
		<Tab id={RAW_LINKS_VIEW.id} {selected}>
			<RawLinksView bind:entries />
		</Tab>
		<Tab id={EMAIL_VIEW.id} {selected}>
			<EmailView bind:entries />
		</Tab>
	</div>
</Tabs>
