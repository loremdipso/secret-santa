<script>
	let postVar;
	let fileVar;

	function submitForm() {
		event.preventDefault();

		const dataArray = new FormData();
		dataArray.append("superHeroName", postVar);
		dataArray.append("uploadFile", fileVar);

		fetch("api_url_here", {
			method: "POST",
			headers: [["Content-Type", "multipart/form-data"]],
			body: dataArray,
		})
			.then((response) => {
				// Successfully uploaded
			})
			.catch((error) => {
				// Upload failed
			});
	}
</script>

<div>
	<form on:submit={submitForm}>
		<input
			type="text"
			bind:value={postVar}
			placeholder={"Superhero Name"}
		/>
		<br />
		<input type="file" bind:files={fileVar} />
		<br />
		<input type="submit" />
	</form>
</div>
