import {TestItemDto} from "./TestItemDto";
import {UserDto} from "../UserDto";
import {CategoryDto} from "../CategoryDto";

export class TestDto {
    id!: number
    name!: string
    previewImg?: string
    categories: CategoryDto[] = []
    questions: TestItemDto[] = []
    author!: UserDto
}