<template>
  <q-table
    flat
    bordered
    :columns="columns"
    :rows="filteredCars"
    :rows-per-page-label="t('listOfCars.recordsPerPage')"
  >
    <template v-slot:header="props">
      <q-tr :props="props">
        <q-th
          v-for="col in props.cols"
          :key="col.name"
          :props="props"
          class="text-center"
        >
          {{ t(col.label) }}
        </q-th>
      </q-tr>
    </template>

    <template v-slot:body-cell-status="props">
      <q-td align="center">
        <CarStatusLabel :status="props.row.status" />
      </q-td>
    </template>

    <template
      v-if="userInfo && userInfo.role === 'admin'"
      v-slot:body-cell-actions="props"
    >
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
</template>

<script setup>
import CarStatusLabel from "src/components/CarStatusLabel.vue";
import moment from "moment";
import EditCarButton from "./EditCarButton.vue";
import DeleteCarButton from "./DeleteCarButton.vue";
import { useCarListStore } from "src/stores/car-list-store";
import { computed, watch } from "vue";
import { useI18n } from "vue-i18n";

const { t, locale } = useI18n();

const carListStore = useCarListStore();
const filteredCars = computed(() => carListStore.filteredCars);
const loadingData = computed(() => carListStore.loading);
const userInfo = JSON.parse(sessionStorage.getItem("user"));

const columns = [
  {
    name: "brand",
    required: true,
    label: "listOfCars.headers.brand",
    align: "center",
    field: (row) => row.brand,
    sortable: true,
  },
  {
    name: "model",
    required: true,
    label: "listOfCars.headers.model",
    align: "center",
    field: (row) => row.model,
    sortable: true,
  },
  {
    name: "year",
    required: true,
    label: "listOfCars.headers.year",
    align: "center",
    field: (row) => row.year,
    sortable: true,
  },
  {
    name: "status",
    required: true,
    label: "listOfCars.headers.status",
    align: "center",
    field: (row) => row.status,
    sortable: true,
  },
  {
    name: "createdAt",
    required: true,
    label: "listOfCars.headers.createdAt",
    align: "center",
    field: (row) => moment(row.createdAt).format("DD-MM-YYYY"),
    sortable: true,
  },
  {
    name: "createdBy",
    required: true,
    label: "listOfCars.headers.createdBy",
    align: "center",
    field: (row) => row.createdBy[0]?.name,
    sortable: true,
  },
  {
    name: "updatedAt",
    required: true,
    label: "listOfCars.headers.updatedAt",
    align: "center",
    field: (row) => moment(row.updatedAt).format("DD-MM-YYYY"),
    sortable: true,
  },
  {
    name: "updatedBy",
    required: true,
    label: "listOfCars.headers.updatedBy",
    align: "center",
    field: (row) => row.updatedBy[0]?.name,
    sortable: true,
  },
];

const computedColumns = computed(() => columns);

if (userInfo && userInfo.role === "admin") {
  columns.push({
    name: "actions",
    required: true,
    label: "listOfCars.headers.actions",
    align: "center",
    field: (row) => row._id,
  });
}
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
