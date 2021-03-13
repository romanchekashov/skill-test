import {isProd} from "../utils/utils";

export async function handleResponse(response: any) {
    if (response.ok) return response.json();
    if (response.status === 400) {
        // So, a server-side validation error occurred.
        // Server side validation returns a string error message, so parse as text instead of json.
        const error = await response.json();
        throw new Error(error.message);
    }
    throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error: any) {
    // eslint-disable-next-line no-console
    console.error("API call failed. " + error);
    throw error;
}

// возвращает куки с указанным name,
// или undefined, если ничего не найдено
export function getCookie(name: string): string {
    let matches = document.cookie.match(new RegExp(
        "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
    ));
    return matches ? decodeURIComponent(matches[1]) : "";
}

export const xsrf = (headers: any): any => {
    const xsrf_token = getCookie("xsrf_token");
    if (xsrf_token) headers["X-XSRF-TOKEN"] = xsrf_token;
    if (!isProd()) headers["Authorization"] = `Bearer ${getCookie("jwt_access_token")}`;
    return headers;
}