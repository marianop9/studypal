import { subjectsService } from '$lib/services/subjects';
import type { PageLoad } from './$types';

export const load: PageLoad = async () => {
	const subjects = subjectsService.list();
    
	return {
		subjects
	};
};
