export class TestItemDto {
    id!: number
    question!: string
    possibleAnswers: string[] = []
    answers: string[] = []
    multiChoice?: boolean = false
    info?: string
}