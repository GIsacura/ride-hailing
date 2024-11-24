import moment from "moment";
import { defineStore } from "pinia";
import CarService from "src/services/car.service";
import { computed, ref } from "vue";

export const useCarListStore = defineStore("carList", () => {
  const cars = ref([]);
  const totalCars = ref(0);
  const loading = ref(false);
  const error = ref(null);
  const currentPage = ref(1);
  const filterProperty = ref({ label: "Marca", value: "brand" });
  const filterValue = ref("");
  const filteredCars = computed(() =>
    cars.value.filter((car) => {
      if (filterProperty.value && filterValue.value) {
        if (["createdAt", "updatedAt"].includes(filterProperty.value.value)) {
          return (
            moment(car[filterProperty.value.value]).format("YYYY/MM/DD") >=
              filterValue.value.from &&
            moment(car[filterProperty.value.value]).format("YYYY/MM/DD") <=
              filterValue.value.to
          );
        }
        return car[filterProperty.value.value]
          .toLowerCase()
          .includes(filterValue.value.toLowerCase());
      }
      return true;
    })
  );

  const fetchCars = async () => {
    loading.value = true;
    try {
      const res = await CarService.getAllCars();
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
        fetchCars();
        changePage(1);
        return;
      }

      cars.value.pop();

      cars.value = [response.data.car, ...cars.value];
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const updateCar = async (carId, carData) => {
    try {
      const response = await CarService.updateCarInfo(carId, carData);
      const index = cars.value.findIndex((car) => car._id === carId);
      cars.value[index] = response.data.car;
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const deleteCar = async (carId) => {
    try {
      await CarService.deleteCar(carId);
      cars.value = cars.value.filter((car) => car._id !== carId);
    } catch (error) {
      throw new Error(error.message);
    }
  };

  const setFilterProperty = (property) => {
    filterProperty.value = property;
  };

  const setFilterValue = (value) => {
    filterValue.value = value;
  };

  const changePage = (page) => {
    currentPage.value = page;
  };

  return {
    cars,
    filteredCars,
    totalCars,
    currentPage,
    loading,
    error,
    fetchCars,
    addCar,
    updateCar,
    deleteCar,
    changePage,
    filterProperty,
    filterValue,
    setFilterProperty,
    setFilterValue,
  };
});
