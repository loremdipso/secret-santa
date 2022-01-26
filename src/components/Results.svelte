<script lang="ts">
	import Button from "smelte/src/components/Button";
	import Select from "smelte/src/components/Select";

	import { createEventDispatcher } from "svelte";
	let dispatch = createEventDispatcher();

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
	import Fabulous from "../common/Fabulous.svelte";
	import ExportDialog from "./ExportDialog.svelte";

	export let players: IPlayer[];
	export let matchups: IResultPair[];
	export let showPlayerEntry: boolean;

	let showExportDialog: boolean = false;

	const EMAIL_VIEW = { value: "3", text: "Table" };
	const RAW_LINKS_VIEW = { value: "2", text: "Plain" };
	const items = [EMAIL_VIEW, RAW_LINKS_VIEW];

	let selected = EMAIL_VIEW.value;

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

<Fabulous position="bottomLeft">
	<Button
		color="secondary"
		title="Back to edit"
		on:click={() => (showPlayerEntry = true)}
		icon="arrow_back"
	/>
</Fabulous>

<Fabulous>
	<Button
		color="blue"
		icon="file_download"
		classes="ml-auto mr-auto m-1"
		title="Import"
		on:click={() => (showExportDialog = true)}
	/>
	<Button color="secondary" on:click={() => dispatch("calculate")}>
		Recalculate
	</Button>
</Fabulous>

<Select label="Display results as" {items} bind:value={selected} />

{#if selected === EMAIL_VIEW.value}
	<EmailView bind:entries />
{:else}
	<RawLinksView bind:entries />
{/if}
<ExportDialog
	bind:showDialog={showExportDialog}
	on:export-basic={() => {
		exportResults(ExportType.BASIC);
	}}
	on:export-progressive={() => {
		exportResults(ExportType.PROGRESSIVE);
	}}
/>
