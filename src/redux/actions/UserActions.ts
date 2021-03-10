import {UserEntity} from "../../data/UserEntity";

export const USER_LOG_IN = "USER_LOG_IN";
export const USER_LOG_IN_SUCCESS = "USER_LOG_IN_SUCCESS";
export const USER_LOG_OUT = "USER_LOG_OUT";


export interface UserLogInAction {
    type: typeof USER_LOG_IN
    username: string
}

export interface UserLogInSuccessAction {
    type: typeof USER_LOG_IN_SUCCESS
    user: UserEntity
}

export interface UserLogOutAction {
    type: typeof USER_LOG_OUT
}

export type UserActionTypes = UserLogInAction | UserLogInSuccessAction | UserLogOutAction;


export function userLogIn(username: string): UserActionTypes {
    return {
        type: USER_LOG_IN,
        username
    }
}

export function userLogInSuccess(user: UserEntity): UserActionTypes {
    return {
        type: USER_LOG_IN_SUCCESS,
        user
    }
}

export function userLogOut(): UserActionTypes {
    return {
        type: USER_LOG_OUT
    }
}
