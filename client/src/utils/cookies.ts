import { isBrowser } from "./utils";

export const getCookiePart = (cookie: string, name: string): string => {
  let matches = cookie.match(
    new RegExp(
      "(?:^|; )" +
        name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
        "=([^;]*)"
    )
  );
  return matches ? decodeURIComponent(matches[1]) : "";
};

export interface Cookie {
  name: string;
  value: string;
  path?: string;
  expires?: Date;
}

export class CookieStore {
  store: string;

  constructor(store: string) {
    this.store = store;
  }

  _getStore() {
    return isBrowser() ? document.cookie : this.store;
  }

  getCookie(name: string): string {
    return getCookiePart(this._getStore(), name);
  }

  setCookie({ name, value, path, expires }: Cookie) {
    if (isBrowser()) {
      document.cookie =
        `${name}=${value}` +
        (path ? `; path=${path}` : "") +
        (expires ? `; expires=${expires}` : "");
    }
  }
}

let cookieStore = new CookieStore(isBrowser() ? document.cookie : "");

export const setCookieStore = (store: string) => {
  cookieStore = new CookieStore(store);
};
export const getCookieStore = (): CookieStore => {
  return cookieStore;
};

export const getCookie = (name: string): string =>
  getCookieStore().getCookie(name);
export const setCookie = (cookie: Cookie): void =>
  getCookieStore().setCookie(cookie);
