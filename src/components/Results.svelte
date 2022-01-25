<script lang="ts">
	import { createEventDispatcher } from "svelte";
	import Button from "smelte/src/components/Button";

	import ExportDialog from "./ExportDialog.svelte";
	import Tabs from "../common/Tabs/Tabs.svelte";

	// TODO: why doesn't this import work?
	// import Tab from "smelte/src/components/Tabs/Tab";
	import { Tab } from "smelte";

	import type { IPlayer, IEntry, IResultPair, IData } from "../interfaces";
	import { VERSION } from "../interfaces";
	import {
		calculateLinkUrl,
		findPlayerById,
		playerIsEmpty,
	} from "../helpers";
	import RawLinksView from "./ResultsViews/RawLinksView.svelte";
	import EmailView from "./ResultsViews/EmailView.svelte";
	import { toaster } from "../common/Toast.svelte";
	import { saveDataToFile } from "../common/misc";

	let dispatch = createEventDispatcher();

	export let players: IPlayer[];
	export let matchups: IResultPair[];
	export let showPlayerEntry: boolean;

	let showExportDialog: boolean = false;

	const EMAIL_VIEW = { id: "3", text: "Table" };
	const RAW_LINKS_VIEW = { id: "2", text: "Plaintext" };
	const items = [EMAIL_VIEW, RAW_LINKS_VIEW];

	let selected: string = EMAIL_VIEW.id;

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

	enum ExportType {
		BASIC,
		PROGRESSIVE,
	}

	function exportResults(exportType: ExportType) {
		const filename = `secret_santa_${
			new Date().toISOString().split("T")[0]
		}.json`;
		let tempPlayers = players;
		if (exportType === ExportType.PROGRESSIVE) {
			// first, deep-clone the players so we don't muck them up
			tempPlayers = JSON.parse(JSON.stringify(players));

			// add the new exclusions
			for (const matchup of matchups) {
				for (const player of tempPlayers) {
					if (player.id === matchup.a) {
						// poor man's sort-and-unique
						player.exclusions = player.exclusions
							.sort()
							.filter((el, i, a) => i === a.indexOf(el));
						if (player.exclusions.indexOf(matchup.b) === -1) {
							player.exclusions.push(matchup.b);
						}
						break;
					}
				}
			}
		}

		const data: IData = {
			version: VERSION,
			// TODO: there's gotta be an easier way to exclude the empty one
			players: tempPlayers.slice(0, tempPlayers.length - 1),
		};

		saveDataToFile(filename, JSON.stringify(data));
	}

	$: entries = generateEntries(matchups);
</script>

<div class="flex flex-wrap justify-around flex-col sm:flex-row p-5 bg-dark-900">
	<Button on:click={() => (showPlayerEntry = true)}>Back to Edit</Button>

	<Button on:click={() => dispatch("calculate")}>Recalculate</Button>

	<Button on:click={() => (showExportDialog = true)}>Export</Button>
</div>

<Tabs bind:selected {items}>
	<div slot="content" class="absolute w-full p-2 whitespace-pre">
		<Tab id={EMAIL_VIEW.id} {selected}>
			<EmailView bind:entries />
		</Tab>
		<Tab id={RAW_LINKS_VIEW.id} {selected}>
			<RawLinksView bind:entries />
		</Tab>
	</div>
</Tabs>

<ExportDialog
	bind:showDialog={showExportDialog}
	on:export-basic={() => {
		exportResults(ExportType.BASIC);
	}}
	on:export-progressive={() => {
		exportResults(ExportType.PROGRESSIVE);
	}}
/>
