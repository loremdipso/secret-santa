<script lang="ts">
	import Button from "smelte/src/components/Button";

	import { toaster } from "../../common/Toast.svelte";
	import type { IEntry } from "../../interfaces";

	export let entries: IEntry[];

	function getRawTextContent(): string {
		let rv = "";
		for (let i = 0; i < entries.length; i++) {
			let entry = entries[i];
			if (i > 0) {
				rv += "\n\n";
			}
			rv += entry.gifter.name;
			rv += "\n";
			rv += entry.url;
		}
		return rv;
	}

	$: rawTextContent = getRawTextContent();

	function copyToClipboard() {
		navigator.clipboard.writeText(rawTextContent);
		toaster.notify("Copied!");
	}
</script>

<Button on:click={() => copyToClipboard()}>Copy to Clipboard</Button>

<div class="overflow-auto w-full h-full bg-white text-black">
	{rawTextContent}
</div>
