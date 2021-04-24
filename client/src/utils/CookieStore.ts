export class CookieStore {
  store: string;

  constructor(store: string) {
    this.store = store;
  }

  getCookie(name: string): string {
    let matches = this.store.match(
      new RegExp(
        "(?:^|; )" +
          name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, "\\$1") +
          "=([^;]*)"
      )
    );
    return matches ? decodeURIComponent(matches[1]) : "";
  }
}
