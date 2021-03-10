import {TestItemEntity} from "./TestItemEntity";

export class TestEntity {
    id!: number
    name!: string
    previewImg?: string
    categories: string[] = []
    questions: TestItemEntity[] = []
}