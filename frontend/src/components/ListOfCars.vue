<template>
  <transition
    appear
    enter-active-class="animated fadeIn"
    leave-active-class="animated fadeOut"
  >
    <q-table flat bordered :columns="columns" :rows="filteredCars">
      <template v-slot:body-cell-status="props">
        <td align="center">
          <CarStatusLabel :status="props.row.status" />
        </td>
      </template>
      <template v-slot:body-cell-actions="props">
        <td align="center">
          <q-btn flat icon="las la-ellipsis-v">
            <q-menu
              style="width: max-content; display: flex; flex-direction: column"
            >
              <EditCarButton :item="props.row" />
              <DeleteCarButton :item="props.row" />
            </q-menu>
          </q-btn>
        </td>
      </template>
    </q-table>
  </transition>

  <q-inner-loading :showing="loadingData">
    <q-spinner-gears size="50px" color="primary" />
  </q-inner-loading>
</template>

<script setup>
import CarStatusLabel from "src/components/CarStatusLabel.vue";
import moment from "moment";
import EditCarButton from "./EditCarButton.vue";
import DeleteCarButton from "./DeleteCarButton.vue";
import { useCarListStore } from "src/stores/car-list-store";
import { computed } from "vue";

const carListStore = useCarListStore();
const filteredCars = computed(() => carListStore.filteredCars);
const loadingData = computed(() => carListStore.loading);

const columns = [
  {
    name: "brand",
    required: true,
    label: "Marca",
    align: "center",
    field: (row) => row.brand,
    sortable: true,
  },
  {
    name: "model",
    required: true,
    label: "Modelo",
    align: "center",
    field: (row) => row.model,
    sortable: true,
  },
  {
    name: "year",
    required: true,
    label: "Año",
    align: "center",
    field: (row) => row.year,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "Estado",
    align: "center",
    field: (row) => row.status,
    sortable: true,
  },
  {
    name: "createdAt",
    required: true,
    label: "Fecha de creación",
    align: "center",
    field: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
    sortable: true,
  },
  {
    name: "createdBy",
    required: true,
    label: "Creado por",
    align: "center",
    field: (row) => row.createdBy[0]?.name,
    sortable: true,
  },
  {
    name: "updatedAt",
    required: true,
    label: "Ultima actualización",
    align: "center",
    field: (row) => moment(row.updatedAt).format("DD-MM-YYYY"),
    sortable: true,
  },
  {
    name: "updatedBy",
    required: true,
    label: "Actualizado por",
    align: "center",
    field: (row) => row.updatedBy[0]?.name,
    sortable: true,
  },
  {
    name: "actions",
    required: true,
    label: "Acciones",
    align: "center",
    field: (row) => row._id,
  },
];
</script>

<style>
.card {
  width: 100%;
  max-width: 250px;
  background-color: #3cd4ae;
  padding: 10px;
}

.list {
  width: 100%;
}

.car-info {
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5px;
  justify-content: space-evenly;
  flex-wrap: wrap;
  height: 150px;
  @media (max-width: 450px) {
    flex-direction: row;
    height: auto;
    justify-content: start;
  }
}

.property {
  min-width: 100px;
}

.new-label {
  background-color: #3cd4ae;
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}

.button-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin-right: 10px;
}

.title-property {
  text-decoration: underline;
  margin-right: 2px;
}
</style>
