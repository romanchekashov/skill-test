import {TestItemEntity} from "./TestItemEntity";
import {UserEntity} from "./UserEntity";

export class TestEntity {
    id!: number
    name!: string
    previewImg?: string
    categories: string[] = []
    questions: TestItemEntity[] = []
    author!: UserEntity
}