import HttpService from "./http";

const token = sessionStorage.getItem("token");

export default class CarService {
  static async getAllCars(queryParams) {
    // const { limit, offset } = queryParams;

    // const query = `?limit=${limit}&offset=${offset}`;

    return await HttpService.get(`/cars`, {
      Authorization: `Bearer ${token}`,
    });
  }

  static async addNewCar(carData) {
    return await HttpService.post("/cars", carData, {
      Authorization: `Bearer ${token}`,
    });
  }

  static async updateCarInfo(carId, carData) {
    return await HttpService.patch(`/cars/${carId}`, carData, {
      Authorization: `Bearer ${token}`,
    });
  }

  static async deleteCar(carId) {
    return await HttpService.delete(`/cars/${carId}`, {
      Authorization: `Bearer ${token}`,
    });
  }
}
