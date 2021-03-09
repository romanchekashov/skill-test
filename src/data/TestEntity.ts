import {TestItemEntity} from "./TestItemEntity";

export class TestEntity {
    id!: number
    name!: string
    categories: string[] = []
    questions: TestItemEntity[] = []
}