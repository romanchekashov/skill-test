import {UserDto} from "../dto/UserDto";
import base64 from "base-64";
import {handleError, handleResponse} from "./apiUtils";

const baseUrl = process.env.REACT_APP_API_URL + "/";

export function auth(username: string, password: string): Promise<UserDto> {
    return fetch(baseUrl + 'auth/', {
        method: "POST", // POST for create, PUT to update when id already exists.
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
            username: base64.encode(username),
            password: base64.encode(password)
        })
    })
        .then(response => handleResponse(response))
        .catch(handleError);
}

// export function getTrend(classCode: ClassCode, securityCode: string, interval: Interval, numberOfCandles: number): Promise<Trend> {
//     return fetch(`${baseUrl}trend?classCode=${classCode}&securityCode=${securityCode}&interval=${interval}&numberOfCandles=${numberOfCandles}`)
//         .then(handleResponse)
//         .catch(handleError);
// }