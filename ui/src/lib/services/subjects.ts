import type { SubjectModel } from "$lib/models/subjects.model";
import pbClient from "$lib/pocketbase";



interface ISubjectsService {
    list(): Promise<SubjectModel[]>
}

export const subjectsService: ISubjectsService = {
    async list() {
        await new Promise((res) => setTimeout(res, 1000))
        return pbClient.subjects.getFullList()
    },
}