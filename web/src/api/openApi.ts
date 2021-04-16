import {UserDto} from "../dto/UserDto";
import base64 from "base-64";
import {handleError, handleResponse, xsrf} from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + "/";

export function login(username: string, password: string): Promise<UserDto> {
    return fetch(baseUrl + 'login', {
        method: "POST", // POST for create, PUT to update when id already exists.
        headers: {"content-type": "application/json"},
        credentials: "include",
        body: JSON.stringify({
            username: base64.encode(username),
            password: base64.encode(password)
        })
    })
        .then(response => handleResponse(response))
        .catch(handleError);
}

export function logout(): Promise<Response | void> {
    return fetch(baseUrl + 'logout', {
        method: "GET", // POST for create, PUT to update when id already exists.
        headers: xsrf({
            "content-type": "application/json"
        }),
        credentials: "include"
    })
        .catch(handleError);
}

export function createUser(username: string, password: string): Promise<UserDto> {
    return fetch(baseUrl + 'users', {
        method: "POST", // POST for create, PUT to update when id already exists.
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            username,
            password: base64.encode(password)
        })
    })
        .then(response => handleResponse(response))
        .catch(handleError);
}

export function getCurrentUser(): Promise<UserDto> {
    return fetch(baseUrl + 'current-user', {
        method: "GET", // POST for create, PUT to update when id already exists.
        headers: xsrf({
            "content-type": "application/json"
        }),
        credentials: "include"
    })
        .then(response => handleResponse(response))
        .catch(handleError);
}