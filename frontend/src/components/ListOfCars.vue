<template>
  <q-list class="list" bordered separator>
    <div v-for="item in data" :key="item._id">
      <q-expansion-item expand-separator icon="las la-car-side">
        <template v-slot:header>
          <div style="width: 100%">
            Vehículo: {{ item.brand }}
            <span v-if="isNew(item.createdAt)" class="new-label">new</span>
          </div>
        </template>
        <q-card style="display: flex; justify-content: space-between">
          <q-card-section class="car-info">
            <p class="property">Marca: {{ item.brand }}</p>
            <p class="property">Año: {{ item.year }}</p>
            <p class="property">Modelo: {{ item.model }}</p>
            <p class="property">
              Estado: <CarStatusLabel :status="item.status" />
            </p>
            <p class="property">
              Creado:
              {{ moment(item.createdAt).format("DD-MM-YYYY") }}
            </p>
            <p class="property">Creado por: {{ item.createdBy[0]?.name }}</p>
            <p class="property">
              Actualizado: {{ moment(item.updatedAt).format("DD-MM-YYYY") }}
            </p>
            <p class="property">
              Actualizado por: {{ item.updatedBy[0]?.name }}
            </p>
          </q-card-section>

          <div class="button-container">
            <q-btn color="primary" label="Editar" @click="editCar(item._id)" />
            <q-btn
              color="negative"
              label="Eliminar"
              @click="deleteCar(item._id)"
            />
          </div>
        </q-card>
      </q-expansion-item>
    </div>
  </q-list>
</template>

<script setup>
import CarStatusLabel from "src/components/CarStatusLabel.vue";
import moment from "moment";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});

const isNew = (createdAt) => {
  const now = moment();
  const created = moment(createdAt);
  return now.diff(created, "minutes") < 10;
};
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
</style>
