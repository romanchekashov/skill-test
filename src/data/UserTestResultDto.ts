import {UserDto} from "./UserDto";
import {TestDto} from "./TestDto";
import {UserTestItemAnswerDto} from "./UserTestItemAnswerDto";

export class UserTestResultDto {
    id!: number
    user!: UserDto
    test!: TestDto
    result: UserTestItemAnswerDto[] = []
}