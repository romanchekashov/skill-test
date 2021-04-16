import {TestItemEntity} from "./test/TestItemEntity";

export class UserTestItemAnswerEntity {
    question!: TestItemEntity
    answers: string[] = []
}