import { getCookie } from "../utils/dataStore";
import { isProd } from "../utils/utils";

export async function handleResponse(response: any) {
  if (response.ok) return response.json();
  if (response.status === 401) {
    const error = await response.text();
    throw new Error(error);
  }
  //   if (response.status === 400) {
  //     // So, a server-side validation error occurred.
  //     // Server side validation returns a string error message, so parse as text instead of json.
  //     const error = await response.json();
  //     throw new Error(error.message);
  //   }

  const error = await response.json();
  if (error) {
    // So, a server-side validation error occurred.
    // Server side validation returns a string error message, so parse as text instead of json.
    throw new Error(error.message);
  }
  throw new Error("Network response was not ok.");
}

// In a real app, would likely call an error logging service.
export function handleError(error: any) {
  // eslint-disable-next-line no-console
  console.error("API call failed. ", error);
  throw error;
}

export const xsrf = (headers: any): any => {
  const xsrf_token = getCookie("xsrf_token");
  if (xsrf_token) headers["X-XSRF-TOKEN"] = xsrf_token;
  if (!isProd())
    headers["Authorization"] = `Bearer ${getCookie("jwt_access_token")}`;
  return headers;
};

export function get<T>(url: string): Promise<T> {
  return fetch(url, {
    method: "GET",
    headers: xsrf({ "content-type": "application/json" }),
  })
    .then((response) => handleResponse(response))
    .catch(handleError);
}

/**
 * How to create TS generics:
 * 1 - function foo<T>(x: T): T { return x; }
 * 2 - const foo = <T extends unknown>(x: T) => x;
 *
 * @param url
 * @param json
 * @returns
 */
export const post = <T extends unknown>(url: string, json: T): Promise<T> =>
  fetch(url, {
    method: "POST",
    headers: xsrf({ "content-type": "application/json" }),
    body: JSON.stringify(json),
  })
    .then((response) => handleResponse(response))
    .catch(handleError);

export function put<T>(url: string, json: T): Promise<T> {
  return fetch(url, {
    method: "PUT",
    headers: xsrf({ "content-type": "application/json" }),
    body: JSON.stringify(json),
  })
    .then((response) => handleResponse(response))
    .catch(handleError);
}
