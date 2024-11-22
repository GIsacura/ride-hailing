import HttpService from "./http";

export default class UserService {
  static async register(user) {
    return await HttpService.post("/auth/register", user);
  }

  static async login(user) {
    return await HttpService.post("/auth/login", user);
  }

  static async isValidToken() {
    return await HttpService.get("/auth/isValidToken", {
      Authorization: `Bearer ${sessionStorage.getItem("token")}`,
    });
  }
}
