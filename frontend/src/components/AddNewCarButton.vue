<template lang="">
  <q-btn color="primary" label="Añadir auto" @click="createNewCar = true" />
  <q-dialog v-model="createNewCar" persistent="">
    <q-card style="min-width: 350px">
      <q-card-section>
        <h5 style="margin: 0">Crear nuevo carro</h5>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="brand"
            label="Marca"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es requerido',
            ]"
          />
          <q-input
            v-model="model"
            label="Modelo"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es requerido',
            ]"
          />
          <q-input
            v-model="year"
            label="Año"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) => (val && val.length > 0) || 'Este campo es requerido',
            ]"
          />
          <q-select
            v-model="status"
            label="Estado"
            outlined
            style="margin-bottom: 10px"
            :options="[
              { label: 'Disponible', value: 'available' },
              { label: 'En servicio', value: 'in-service' },
              { label: 'En mantenimiento', value: 'in-maintenance' },
            ]"
            :rules="[
              (val) =>
                (val && val.value.length > 0) || 'Este campo es requerido',
            ]"
          />
          <q-card-actions align="right" class="text-primary">
            <q-btn color="primary" label="Cancelar" v-close-popup />
            <q-btn color="primary" label="Añadir" v-close-popup type="submit" />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
defineOptions({
  name: "AddNewCarButton",
});
import { ref } from "vue";
import { useCarListStore } from "src/stores/car-list-store";
import { useQuasar } from "quasar";

const $q = useQuasar();

const createNewCar = ref(false);
const brand = ref("");
const model = ref("");
const year = ref("");
const status = ref({ label: "Disponible", value: "available" });

const carListStore = useCarListStore();

const onSubmit = async () => {
  try {
    carListStore.addCar({
      brand: brand.value,
      model: model.value,
      year: year.value,
      status: status.value.value,
    });

    $q.notify({
      type: "positive",
      textColor: "white",
      message: "Auto agregado exitosamente",
      position: "top",
    });
  } catch (error) {
    $q.notify({
      type: "negative",
      textColor: "white",
      message: error.message,
      position: "top",
    });
  }
};
</script>
<style lang=""></style>
