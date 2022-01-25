<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "smelte/src/components/Button";
	// import Tabs from "smelte/src/components/Tabs";
	import Tabs from "./Tabs/Tabs.svelte";

	// TODO: why doesn't this import work?
	// import Tab from "smelte/src/components/Tabs/Tab";
	import { Tab } from "smelte";

	import type { IPlayer, IEntry, IResultPair } from "../interfaces";
	import {
		calculateLinkUrl,
		findPlayerById,
		playerIsEmpty,
	} from "../helpers";
	import ActionBar from "./ActionBar.svelte";
	import RawLinksView from "./ResultsViews/RawLinksView.svelte";
	import LinksView from "./ResultsViews/LinksView.svelte";
	import EmailView from "./ResultsViews/EmailView.svelte";
	import { toaster } from "./Toast.svelte";

	let dispatch = createEventDispatcher();

	export let players: IPlayer[];
	export let matchups: IResultPair[];
	export let showPlayerEntry: boolean;

	const LINKS_VIEW = { id: "1", text: "Links view" };
	const RAW_LINKS_VIEW = { id: "2", text: "Raw links view" };
	const EMAIL_VIEW = { id: "3", text: "Email view" };
	const items = [LINKS_VIEW, RAW_LINKS_VIEW, EMAIL_VIEW];

	let selected: string = LINKS_VIEW.id;

	function generateEntries(matchups: IResultPair[]): IEntry[] {
		let rv = [];
		for (let matchup of matchups) {
			let gifter = findPlayerById(players, matchup.a);
			let giftee = findPlayerById(players, matchup.b);
			if (!playerIsEmpty(gifter) && !playerIsEmpty(giftee)) {
				rv.push({ gifter, giftee, url: calculateLinkUrl(giftee) });
			} else {
				toaster.alert("UNKNOWN ERROR GENERATING PLAYER ENTRIES");
			}
		}
		return rv;
	}

	$: entries = generateEntries(matchups);
</script>

<ActionBar>
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

<Tabs bind:selected {items}>
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
