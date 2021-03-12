import {TestItemDto} from "./TestItemDto";

export class UserTestItemAnswerDto {
    question!: TestItemDto
    answers: string[] = []
}