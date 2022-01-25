<script lang="ts">
	import Button from "smelte/src/components/Button";
	import Dialog from "smelte/src/components/Dialog";

	export let showDialog = true;
</script>

<Dialog bind:value={showDialog} classes={(c) => c + " m-2"}>
	<h5 slot="title">Welcome!</h5>

	<div class="dialog-content">
		<p>
			Organizing a <a
				class="text-blue-200"
				target="#"
				href="https://en.wikipedia.org/wiki/Secret_Santa"
				>Secret Santa</a
			> party can be a somewhat daunting task. Often you've got people who
			really shouldn't be paired with each other -- couples, enemies, etc.
			Plus it's no fair that the organizer can't play.
		</p>

		<p>
			This simple tool solves those problems with the magic of computers!
			Simply plug in your participants info (don't worry, there's no
			server involved, so nothing gets saved, ever), hit calculate, and
			you're done! Then you can pre-populate emails to each participant in
			a new tab (careful -- if you've got a lot of people that can crash
			your browser).
		</p>

		<p>
			There's even import and export functionality to make your next
			year's Santa-ing a breeze.
		</p>
	</div>

	<div slot="actions">
		<Button text variant="raised" on:click={() => (showDialog = false)}>
			Got it!
		</Button>
	</div>
</Dialog>

<style>
	.dialog-content {
		max-height: 80vh;
		max-width: 30rem;
		overflow: auto;
	}

	.dialog-content > p {
		padding-bottom: 0.5rem;
	}
</style>
