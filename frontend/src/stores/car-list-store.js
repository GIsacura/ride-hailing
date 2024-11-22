import { defineStore } from "pinia";
import CarService from "src/services/car.service";
import { ref } from "vue";

export const useCarListStore = defineStore("carList", () => {
  const cars = ref([]);
  const totalCars = ref(0);
  const loading = ref(false);
  const error = ref(null);
  const currentPage = ref(1);

  const fetchCars = async ({ limit, offset }) => {
    loading.value = true;
    try {
      const res = await CarService.getAllCars({ limit, offset });
      cars.value = res.cars[0].data;
      totalCars.value = res.cars[0].totalCount;
    } catch (err) {
      error.value = err;
    } finally {
      loading.value = false;
    }
  };

  const addCar = async (carData) => {
    try {
      const response = await CarService.addNewCar({
        brand: carData.brand,
        model: carData.model,
        status: carData.status,
        year: carData.year,
      });

      if (currentPage.value !== 1) {
        fetchCars({ limit: 10, offset: 0 });
        changePage(1);
        return;
      }

      cars.value.pop();

      cars.value = [response.data.car, ...cars.value];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const changePage = (page) => {
    currentPage.value = page;
  };

  return {
    cars,
    totalCars,
    currentPage,
    loading,
    error,
    fetchCars,
    addCar,
    changePage,
  };
});
