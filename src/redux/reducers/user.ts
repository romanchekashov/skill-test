import {UserDto} from "../../dto/UserDto";
import {USER_LOG_IN, USER_LOG_IN_SUCCESS, USER_LOG_OUT, UserActionTypes} from "../actions/UserActions";
import dataStore from "../../api/dataStore";

export interface UserState {
    username: string
    error: string
    user: UserDto | null
}

let initState: UserState = {
    username: "",
    error: "",
    user: dataStore.getUser()
};

const user = (state: UserState = initState, action: UserActionTypes): UserState => {
    switch (action.type) {
        case USER_LOG_IN:
            return {
                ...state, username: action.username
            };
        case USER_LOG_IN_SUCCESS:
            return {
                ...state, user: action.user
            };
        case USER_LOG_OUT:
            return initState;
        default:
            return state;
    }
};

export default user;