<template>
  <q-page style="width: 90%; margin: 0 auto">
    <h2>Dashboard</h2>

    <div>
      <div class="filter-container">
        <ListFilter />
        <AddNewCarButton />
      </div>
      <ListOfCars :data="cars" />

      <!-- <div class="q-pa-lg flex flex-center">
        <q-pagination
          v-model="current"
          :max="totalCars % 10 === 0 ? totalCars / 10 : totalCars / 10 + 1"
          :max-pages="6"
          boundary-numbers
        />
      </div> -->
    </div>
  </q-page>
</template>

<script setup>
import ListOfCars from "src/components/ListOfCars.vue";
import AddNewCarButton from "src/components/AddNewCarButton.vue";
import { onMounted, computed, ref, watch } from "vue";
import { useCarListStore } from "src/stores/car-list-store";
import ListFilter from "src/components/ListFilter.vue";

defineOptions({
  name: "DashboardPage",
});

const current = ref(1);

const carListStore = useCarListStore();
onMounted(() => {
  carListStore.fetchCars();
  // carListStore.fetchCars({ limit: 10, offset: current.value * 10 - 10 });
});

// watch(current, (newVal) => {
//   // carListStore.fetchCars({ limit: 10, offset: newVal * 10 - 10 });
//   carListStore.fetchCars();
//   carListStore.changePage(newVal);
// });

const cars = computed(() => carListStore.cars);
// const totalCars = computed(() => carListStore.totalCars);
</script>

<style>
.filter-container {
  width: 100%;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 20px;
  @media (max-width: 500px) {
    flex-direction: column;
  }
}
</style>
