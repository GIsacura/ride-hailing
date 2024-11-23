<template lang="">
  <q-btn
    class="button"
    color="negative"
    label="Eliminar"
    @click="isDeleting = true"
  />
  <q-dialog v-model="isDeleting" persistent="">
    <q-card style="max-width: 350px; width: 100%">
      <q-card-section>
        <h5 style="margin: 0">Eliminar auto</h5>
      </q-card-section>

      <q-card-section>
        <p style="text-align: center">
          ¿Estás seguro de que deseas eliminar este auto?
        </p>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn color="primary" label="Cancelar" v-close-popup />
        <q-btn
          color="negative"
          label="Eliminar"
          @click="deleteCar"
          v-close-popup
        />
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>
<script setup>
import { ref } from "vue";
import { useQuasar } from "quasar";
import { useCarListStore } from "src/stores/car-list-store";

const $q = useQuasar();

defineOptions({
  name: "DeleteCarButton",
});

const carListStore = useCarListStore();

const props = defineProps({
  item: {
    type: Object,
    required: true,
  },
});

const isDeleting = ref(false);

const deleteCar = async () => {
  try {
    carListStore.deleteCar(props.item._id);
    $q.notify({
      type: "positive",
      textColor: "white",
      message: "Auto eliminado exitosamente",
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
<style>
.button {
  width: 100%;
  min-width: 100px;
  max-width: 300px;
}
</style>
