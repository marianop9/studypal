<script lang="ts">
	import { goto } from '$app/navigation';
	import pbClient from '$lib/pocketbase';
	import { AppBar } from '@skeletonlabs/skeleton';
	let { children } = $props();

	function logout() {
		pbClient.logout();
		goto('/login')
	}
</script>

<div class="grid h-screen grid-rows-[auto_1fr_auto]">
	<!-- Header -->
	<header class="">
		<AppBar>
			<div slot="lead"></div>
			<span class="h2">Studypal</span>
			<svelte:fragment slot="trail">
				<button class="variant-filled-secondary btn" onclick={logout}>Logout</button>
			</svelte:fragment>
		</AppBar>
	</header>
	<!-- Main -->
	<main class="space-y-4 p-4">
		{@render children()}

	</main>
	<!-- Footer -->
	<footer class="bg-blue-500 p-4">(footer)</footer>
</div>
