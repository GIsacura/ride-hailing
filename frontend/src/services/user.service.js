import HttpService from "./http";

export default class UserService {
  static async register(user) {
    return await HttpService.post("/auth/register", user);
  }

  static async login(user) {
    return await HttpService.post("/auth/login", user);
  }
}
