import {
  get as getStore,
  set as setStore,
  del as delStore,
} from "../vendor/idb-keyval.js";

// services/auth.js
export class Auth {
  constructor(getStore, setStore, delStore) {}

  async getToken() {
    return await getStore("token");
  }

  async setToken(token) {
    await setStore("token", token);
  }

  async clearToken() {
    await delStore("token");
  }

  async isLoggedIn() {
    const token = await this.getToken();
    return !!token;
  }
}
