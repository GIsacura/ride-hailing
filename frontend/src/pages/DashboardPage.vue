<template>
  <q-page class="">
    <h2>Dashboard</h2>

    <div class="row" style="gap: 10px; width: 90%; margin: 0 auto">
      <ListOfCars :data="data" />
    </div>
  </q-page>
</template>

<script setup>
import CarService from "src/services/car.service";
import ListOfCars from "src/components/ListOfCars.vue";
import { ref, onMounted } from "vue";

defineOptions({
  name: "DashboardPage",
});

const data = ref(null);
const fetchData = async () => {
  const response = await CarService.getAllCars({ limit: 10, offset: 0 });
  console.log({ response });

  data.value = response.cars;
};

onMounted(() => {
  fetchData();
});
</script>
