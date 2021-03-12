import {TestItemAnswerDto} from "./TestItemAnswerDto";

export class TestItemDto {
    id!: number
    question!: string
    answers: TestItemAnswerDto[] = []
    multiChoice?: boolean = false
    info?: string
}