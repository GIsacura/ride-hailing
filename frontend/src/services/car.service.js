import HttpService from "./http";

const token = sessionStorage.getItem("token");

export default class CarService {
  static async getAllCars(queryParams) {
    const { limit, offset } = queryParams;
    const query = `?limit=${limit}&offset=${offset}`;

    return await HttpService.get(`/cars${query}`, {
      Authorization: `Bearer ${token}`,
    });
  }
}
