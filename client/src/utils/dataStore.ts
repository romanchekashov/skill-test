import { UserDto } from "@skill-test/data/dto/UserDto";
import { isBrowser } from "./utils";

class Storage {
  map;
  constructor() {
    this.map = new Map();
  }
  getItem(key: string): string {
    return this.map.get(key);
  }
  setItem(key: string, val: string) {
    this.map.set(key, val);
  }
  removeItem(key: string) {
    this.map.delete(key);
  }
}

const USER_KEY = "user";

const storage = isBrowser() ? sessionStorage : new Storage();
let cookieStore: string = "";

const dataStore = {
  getUser(): UserDto | undefined {
    const sUser = storage.getItem(USER_KEY);
    if (sUser) return JSON.parse(sUser);
  },
  setUser(user: UserDto): boolean {
    storage.setItem(USER_KEY, JSON.stringify(user));
    return true;
  },
  logOut() {
    storage.removeItem(USER_KEY);
  },
  setCookieStore(store: string) {
    cookieStore = store;
  },
  getCookieStore(): string {
    return cookieStore;
  },
};

export default dataStore;
