export const SET_CURRENT_TEST_ID = "SET_CURRENT_TEST_ID";

interface SetCurrentTestIdAction {
    type: typeof SET_CURRENT_TEST_ID
    currentTestId: number
}

export type CurrentTestActionTypes = SetCurrentTestIdAction;

export function sendMessage(newMessage: Message): ChatActionTypes {
    return {
        type: SEND_MESSAGE,
        payload: newMessage
    }
}