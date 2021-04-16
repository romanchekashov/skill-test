import {TestItemDto} from "./test/TestItemDto";

export class UserTestItemAnswerDto {
    question!: TestItemDto
    answerIds: number[] = []
}