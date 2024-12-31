import PocketBase, { ClientResponseError } from 'pocketbase';

const pb = new PocketBase('http://localhost:8090');

interface BaseResponse {
	success: boolean;
	message?: string;
}

class PbClient {
	#internal: PocketBase;

	constructor(pb: PocketBase) {
		this.#internal = pb;
	}

	async login(email: string, password: string): Promise<BaseResponse> {
		try {
			const result = await this.#internal.collection('users').authWithPassword(email, password);
			return { success: true };
		} catch (e: any) {
			if (e instanceof ClientResponseError) {
				console.log(e.response);
				return { success: false, message: e.message };
			} else {
				throw e;
			}
		}
	}

    get isLogged() {
        return this.#internal.authStore.isValid
    }
    
	logout() {
		this.#internal.authStore.clear();
	}
}

const pbClient = new PbClient(pb);
export default pbClient;
