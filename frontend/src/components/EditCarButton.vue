<template lang="">
  <q-btn
    color="primary"
    class="button"
    :label="t('editCarButton.buttonLabel')"
    @click="isEditing = true"
  />
  <q-dialog v-model="isEditing" persistent="">
    <q-card style="max-width: 350px; width: 100%">
      <q-card-section>
        <h5 style="margin: 0">{{ t("editCarButton.title") }}</h5>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            readonly
            v-model="brand"
            :label="t('editCarButton.brand')"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('editCarButton.validation.required'),
              (val) =>
                (val && /^[A-Za-z]+$/.test(val)) ||
                t('editCarButton.validation.brand'),
            ]"
          />
          <q-input
            readonly
            v-model="model"
            :label="t('editCarButton.model')"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('editCarButton.validation.required'),
              (val) =>
                (val && /^[A-Za-z0-9 ]+$/.test(val)) ||
                t('editCarButton.validation.model'),
            ]"
          />
          <q-input
            readonly
            v-model="year"
            :label="t('editCarButton.year')"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('editCarButton.validation.required'),
              (val) =>
                (val && /^[0-9]+$/.test(val)) ||
                t('editCarButton.validation.year'),
            ]"
          />
          <q-select
            v-model="status"
            :label="t('editCarButton.status')"
            outlined
            style="margin-bottom: 10px"
            :options="[
              {
                label: t('editCarButton.statusValues.available'),
                value: 'available',
              },
              {
                label: t('editCarButton.statusValues.inService'),
                value: 'in-service',
              },
              {
                label: t('editCarButton.statusValues.inMaintenance'),
                value: 'in-maintenance',
              },
            ]"
            :rules="[
              (val) =>
                (val && val.value.length > 0) ||
                t('editCarButton.validation.required'),
            ]"
          />
          <q-card-actions align="right" class="text-primary">
            <q-btn
              color="primary"
              :label="t('editCarButton.cancel')"
              v-close-popup
            />
            <q-btn
              color="primary"
              :label="t('editCarButton.save')"
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
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
  available: {
    label: t("editCarButton.statusValues.available"),
    style: "available",
  },
  "in-service": {
    label: t("editCarButton.statusValues.inService"),
    style: "in-service",
  },
  "in-maintenance": {
    label: t("editCarButton.statusValues.inMaintenance"),
    style: "in-maintenance",
  },
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
      message: t("editCarButton.successMessage"),
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
