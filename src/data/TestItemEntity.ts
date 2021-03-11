export class TestItemEntity {
    id!: number
    question!: string
    possibleAnswers: string[] = []
    answers: string[] = []
    multiChoice?: boolean = false
    info?: string
}