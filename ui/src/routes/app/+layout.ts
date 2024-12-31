import { redirect } from '@sveltejs/kit';
import type { LayoutLoad } from './$types';
import pbClient from '$lib/pocketbase';

export const ssr = false;
export const prerender = false; 

export const load: LayoutLoad = ({url}) => {
	if (!pbClient.isLogged) {
		return redirect(307, '/login');
	}
};