<template>
  <q-page
    style="width: 90%; margin: 0 auto; min-height: 100vh; padding-bottom: 20px"
  >
    <h2>{{ t("dashboard.title") }}</h2>

    <div>
      <div class="filter-container">
        <ListFilter />
        <AddNewCarButton />
      </div>

      <ListOfCars v-if="cars.length > 0" />

      <div v-else>
        <q-card flat class="q-pa-md">
          <q-card-section>
            <q-item>
              <q-item-section class="flex center">
                <q-item-label>
                  <h4
                    style="margin: 0; margin-bottom: 10px; text-align: center"
                  >
                    {{ t("dashboard.emptyState.text1") }}
                  </h4>
                  <p
                    style="
                      font-size: 20px;
                      text-align: center;
                      line-height: normal;
                    "
                  >
                    {{ t("dashboard.emptyState.text2") }}
                  </p>
                  <div
                    class="flex"
                    style="width: 100%; justify-content: center"
                  >
                    <AddNewCarButton />
                  </div>
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import ListOfCars from "src/components/ListOfCars.vue";
import AddNewCarButton from "src/components/AddNewCarButton.vue";
import { onMounted, computed, ref, watch } from "vue";
import { useCarListStore } from "src/stores/car-list-store";
import ListFilter from "src/components/ListFilter.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

defineOptions({
  name: "DashboardPage",
});

const carListStore = useCarListStore();
onMounted(() => {
  carListStore.fetchCars();
});

const cars = computed(() => carListStore.cars);
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
