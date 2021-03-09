import {TestItemEntity} from "./TestItemEntity";

export class UserTestItemAnswerEntity {
    question!: TestItemEntity
    answers: string[] = []
}