import {UserDto} from "./UserDto";
import {TestDto} from "./test/TestDto";
import {UserTestItemAnswerDto} from "./UserTestItemAnswerDto";

export class UserTestResultDto {
    id!: number
    user!: UserDto
    test!: TestDto
    result: UserTestItemAnswerDto[] = []
}