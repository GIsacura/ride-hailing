<template lang="">
  <q-btn
    color="primary"
    class="button"
    label="Editar"
    @click="isEditing = true"
  />
  <q-dialog v-model="isEditing" persistent="">
    <q-card style="max-width: 350px; width: 100%">
      <q-card-section>
        <h5 style="margin: 0">Editar auto</h5>
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
            <q-btn
              color="primary"
              label="Guardar"
              v-close-popup
              type="submit"
            />
          </q-card-actions>
        </q-form>
      </q-card-section>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { useCarListStore } from "src/stores/car-list-store";
import { ref } from "vue";
import { useQuasar } from "quasar";

const $q = useQuasar();

defineOptions({
  name: "EditCarButton",
});
const isEditing = ref(false);
const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const statusOptions = {
  available: { label: "Disponible", style: "available" },
  "in-service": { label: "En servicio", style: "in-service" },
  "in-maintenance": { label: "En mantenimiento", style: "in-maintenance" },
};

const brand = ref(props.item.brand);
const model = ref(props.item.model);
const year = ref(props.item.year);
const status = ref(statusOptions[props.item.status]);

const carListStore = useCarListStore();

const onSubmit = async () => {
  try {
    await carListStore.updateCar(props.item._id, {
      brand: brand.value,
      model: model.value,
      year: year.value,
      status: status.value.value,
    });

    $q.notify({
      type: "positive",
      textColor: "white",
      message: "Auto actualizado exitosamente",
      position: "top",
    });

    isEditing.value = false;
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
<style>
.button {
  width: 100%;
  min-width: 100px;
  max-width: 300px;
}
</style>
