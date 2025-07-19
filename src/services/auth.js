// services/auth.js
export class Auth {
  constructor(getStore, setStore, delStore) {
    this.getStore = getStore;
    this.setStore = setStore;
    this.delStore = delStore;
  }

  async getToken() {
    return await this.getStore("token");
  }

  async setToken(token) {
    await this.setStore("token", token);
  }

  async clearToken() {
    await this.delStore("token");
  }

  async isLoggedIn() {
    const token = await this.getToken();
    return !!token;
  }
}
