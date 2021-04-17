import { UserDto } from "@skill-test/data/dto/UserDto";

export const USER_LOG_IN = "USER_LOG_IN";
export const USER_LOG_IN_SUCCESS = "USER_LOG_IN_SUCCESS";
export const USER_LOG_IN_ERROR = "USER_LOG_IN_ERROR";
export const USER_LOG_OUT = "USER_LOG_OUT";

export interface UserLogInAction {
  type: typeof USER_LOG_IN;
  username: string;
}

export interface UserLogInSuccessAction {
  type: typeof USER_LOG_IN_SUCCESS;
  user: UserDto;
}

export interface UserLogInErrorAction {
  type: typeof USER_LOG_IN_ERROR;
  error: string;
}

export interface UserLogOutAction {
  type: typeof USER_LOG_OUT;
}

export type UserActionTypes =
  | UserLogInAction
  | UserLogInSuccessAction
  | UserLogInErrorAction
  | UserLogOutAction;

export function userLogIn(username: string): UserActionTypes {
  return {
    type: USER_LOG_IN,
    username,
  };
}

export function userLogInSuccess(user: UserDto): UserActionTypes {
  return {
    type: USER_LOG_IN_SUCCESS,
    user,
  };
}

export function userLogInError(error: string): UserActionTypes {
  return {
    type: USER_LOG_IN_ERROR,
    error,
  };
}

export function userLogOut(): UserActionTypes {
  return {
    type: USER_LOG_OUT,
  };
}
