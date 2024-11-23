<template>
  <!-- <q-list class="list" bordered separator>
    <div v-for="item in data" :key="item._id">
      <q-expansion-item style="border: 1px solid #fee" icon="las la-car-side">
        <template v-slot:header>
          <div style="width: 100%">
            Vehículo: {{ item.brand }}
            <span v-if="isNew(item.createdAt)" class="new-label">new</span>
          </div>
        </template>
        <q-card style="display: flex; justify-content: space-between">
          <q-card-section class="car-info">
            <p class="property">
              <span class="title-property">Marca:</span>
              {{ item.brand }}
            </p>
            <p class="property">
              <span class="title-property">Año de fabricación:</span>
              {{ item.year }}
            </p>
            <p class="property">
              <span class="title-property">Modelo:</span>
              {{ item.model }}
            </p>
            <p class="property">
              <span class="title-property">Estado:</span>
              <CarStatusLabel :status="item.status" />
            </p>
            <p class="property">
              <span class="title-property">Creado:</span>
              {{ moment(item.createdAt).format("DD-MM-YYYY") }}
            </p>
            <p class="property">
              <span class="title-property">Creado por:</span>
              {{ item.createdBy[0]?.name }}
            </p>
            <p class="property">
              <span class="title-property">Actualizado:</span>
              {{ moment(item.updatedAt).format("DD-MM-YYYY") }}
            </p>
            <p class="property">
              <span class="title-property">Actualizado por:</span>
              {{ item.updatedBy[0]?.name }}
            </p>
          </q-card-section>

          <div class="button-container">
            <EditCarButton :item="item" />
            <DeleteCarButton :item="item" />
          </div>
        </q-card>
      </q-expansion-item>
    </div>
  </q-list> -->

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

const isNew = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);
  return now.diff(created, "minutes") < 10;
};

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
