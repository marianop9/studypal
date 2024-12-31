<script lang="ts">
	import pbClient from '$lib/pocketbase';
	import type { EventHandler, FormEventHandler } from 'svelte/elements';
	import { z } from 'zod';

	import { TabGroup, Tab, TabAnchor } from '@skeletonlabs/skeleton';
	import { goto } from '$app/navigation';

	let tabSet = $state(0);
	let validationMsg = $state('');

	const loginSchema = z.object({
		email: z.string().email(),
		password: z.string().min(1, 'Password is required.')
	});

	function handlesubmit(e: SubmitEvent) {
		e.preventDefault();
		validationMsg = '';
		const form = new FormData(e.currentTarget as HTMLFormElement);

		const email = form.get('email') as string;
		const password = form.get('password') as string;

		const result = loginSchema.safeParse({ email, password });

		if (result.success) {
			pbClient.login(email, password).then((resp) => {
				if (resp.success) {
					goto('/app');
				} else {
					validationMsg = resp.message ?? "";
				}
			});
		} else {
			validationMsg = result.error.errors[0].message;
			console.log(result.error);
		}
	}
</script>

<div class="flex h-screen justify-center">
	<div class="my-auto w-[512px]">
		<TabGroup justify="justify-center">
			<Tab bind:group={tabSet} name="loginTab" value={0}>
				<span>Log In</span>
			</Tab>
			<Tab bind:group={tabSet} name="registerTab" value={1}>Register</Tab>
			<svelte:fragment slot="panel">
				{#if tabSet === 0}
					<form onsubmit={handlesubmit} class="flex flex-col gap-y-2">
						<label for="email" class="label">
							<span class="label-text">Email</span>
							<input class="input" type="email" name="email" placeholder="user@mail.com" />
						</label>
						<label for="password" class="label">
							<span class="label-text">Password</span>

							<input class="input" type="password" name="password" placeholder="********" />
						</label>
						{#if validationMsg !== ''}
							<div class="alert variant-soft-error">
								<div class="alert-message">
									<p>{validationMsg}</p>
								</div>
							</div>
						{/if}
						<div class="flex justify-end">
							<button class=" variant-filled btn">Log In</button>
						</div>
					</form>
				{:else if tabSet === 1}
					TODO!
				{/if}
			</svelte:fragment>
		</TabGroup>
	</div>
</div>
