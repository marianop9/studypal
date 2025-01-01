<script lang="ts">
	let { data } = $props();
</script>

<h3 class="h3">My Subjects</h3>
{#await data.subjects}
	<p>loading...</p>
{:then subjects}
	<ul>
		{#each subjects as subj}
			<li>{subj.name} - {subj.year}</li>
		{/each}
	</ul>
{/await}
