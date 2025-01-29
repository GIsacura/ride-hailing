<template lang="">
  <q-btn
    class="button"
    color="negative"
    :label="t('deleteCarButton.buttonLabel')"
    @click="isDeleting = true"
  />
  <q-dialog v-model="isDeleting" persistent="">
    <q-card style="max-width: 350px; width: 100%">
      <q-card-section>
        <h5 style="margin: 0">{{ t("deleteCarButton.title") }}</h5>
      </q-card-section>

      <q-card-section>
        <p style="text-align: center">
          {{ t("deleteCarButton.text") }}
        </p>
      </q-card-section>
      <q-card-actions align="right" class="text-primary">
        <q-btn
          color="primary"
          :label="t('deleteCarButton.cancel')"
          v-close-popup
        />
        <q-btn
          color="negative"
          :label="t('deleteCarButton.delete')"
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
      message: t("deleteCarButton.successMessage"),
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
