<template>
  <div class="container">
    <q-select
      class="select-filter"
      outlined
      label="Filtrar por"
      v-model="carListStore.filterProperty"
      :options="[
        { label: 'Marca', value: 'brand' },
        { label: 'Modelo', value: 'model' },
        { label: 'Año de fabricación', value: 'year' },
        { label: 'Creado por', value: 'createdBy' },
        { label: 'Actualizado por', value: 'updatedBy' },
        { label: 'Fecha de creación', value: 'createdAt' },
        { label: 'Fecha de actualización', value: 'updatedAt' },
      ]"
    />
    <q-input
      label="Valor a filtrar"
      v-if="showInput"
      v-model="carListStore.filterValue"
      outlined
      dense
      style="width: 200px"
    />

    <q-btn icon="event" round color="primary" v-else>
      <q-popup-proxy
        @before-show="updateProxy"
        cover
        transition-show="scale"
        transition-hide="scale"
      >
        <q-date v-model="proxyDate" range>
          <div class="row items-center justify-end q-gutter-sm">
            <q-btn label="Cancel" color="primary" flat v-close-popup />
            <q-btn
              label="OK"
              color="primary"
              flat
              @click="save"
              v-close-popup
            />
          </div>
        </q-date>
      </q-popup-proxy>
    </q-btn>
  </div>
</template>
<script setup>
import moment from "moment";
import { useCarListStore } from "src/stores/car-list-store";
import { ref, computed, watch } from "vue";
const carListStore = useCarListStore();
const date = ref({
  from: moment(new Date()).subtract(5, "days").format("YYYY/MM/DD"),
  to: moment(new Date()).format("YYYY/MM/DD"),
});
const proxyDate = ref({
  from: moment(new Date()).subtract(5, "days").format("YYYY/MM/DD"),
  to: moment(new Date()).format("YYYY/MM/DD"),
});

const filterProperty = computed(() => carListStore.filterProperty);

const updateProxy = () => {
  proxyDate.value = date.value;
};

const save = () => {
  carListStore.filterValue = proxyDate.value;
};

watch(filterProperty, () => {
  carListStore.filterValue = "";
});

const showInput = computed(() => {
  return ["brand", "model", "year", "createdBy", "updatedBy"].includes(
    carListStore.filterProperty.value
  );
});
</script>
<style>
.container {
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
}
.select-filter {
  width: 180px;
}
</style>
