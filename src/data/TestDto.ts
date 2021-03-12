import {TestItemDto} from "./TestItemDto";
import {UserDto} from "./UserDto";

export class TestDto {
    id!: number
    name!: string
    previewImg?: string
    categories: string[] = []
    questions: TestItemDto[] = []
    author!: UserDto
}