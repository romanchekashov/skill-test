import {UserEntity} from "./UserEntity";
import {TestEntity} from "./TestEntity";
import {UserTestItemAnswerEntity} from "./UserTestItemAnswerEntity";

export class UserTestResultEntity {
    id!: number
    user!: UserEntity
    test!: TestEntity
    result: UserTestItemAnswerEntity[] = []
}