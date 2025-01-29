<template lang="">
  <q-btn
    v-if="userInfo && userInfo.role === 'admin'"
    class="button"
    color="primary"
    :label="t('addNewCarButton.buttonLabel')"
    @click="createNewCar = true"
  />
  <q-dialog v-model="createNewCar" persistent="">
    <q-card style="max-width: 350px; width: 100%">
      <q-card-section>
        <h5 style="margin: 0">{{ t("addNewCarButton.title") }}</h5>
      </q-card-section>

      <q-card-section>
        <q-form @submit="onSubmit">
          <q-input
            v-model="brand"
            :label="t('addNewCarButton.brand')"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('addNewCarButton.validation.required'),
              (val) =>
                (val && /^[A-Za-z]+$/.test(val)) ||
                t('addNewCarButton.validation.brand'),
            ]"
          />
          <q-input
            v-model="model"
            :label="t('addNewCarButton.model')"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('addNewCarButton.validation.required'),
              (val) =>
                (val && /^[A-Za-z0-9 ]+$/.test(val)) ||
                t('addNewCarButton.validation.model'),
            ]"
          />
          <q-input
            v-model="year"
            :label="t('addNewCarButton.year')"
            outlined
            style="margin-bottom: 10px"
            :rules="[
              (val) =>
                (val && val.length > 0) ||
                t('addNewCarButton.validation.required'),
              (val) =>
                (val && /^[0-9]+$/.test(val)) ||
                t('addNewCarButton.validation.year'),
            ]"
          />
          <q-select
            v-model="status"
            :label="t('addNewCarButton.status')"
            outlined
            style="margin-bottom: 10px"
            :options="[
              {
                label: t('addNewCarButton.statusValues.available'),
                value: 'available',
              },
              {
                label: t('addNewCarButton.statusValues.inService'),
                value: 'in-service',
              },
              {
                label: t('addNewCarButton.statusValues.inMaintenance'),
                value: 'in-maintenance',
              },
            ]"
            :rules="[
              (val) =>
                (val && val.value.length > 0) ||
                t('addNewCarButton.validation.required'),
            ]"
          />
          <q-card-actions align="right" class="text-primary">
            <q-btn
              color="primary"
              :label="t('addNewCarButton.cancel')"
              v-close-popup
            />
            <q-btn
              color="primary"
              :label="t('addNewCarButton.add')"
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
defineOptions({
  name: "AddNewCarButton",
});
import { ref } from "vue";
import { useCarListStore } from "src/stores/car-list-store";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const $q = useQuasar();

const createNewCar = ref(false);
const brand = ref("");
const model = ref("");
const year = ref("");
const status = ref({
  label: t("addNewCarButton.statusValues.available"),
  value: "available",
});

const carListStore = useCarListStore();
const userInfo = JSON.parse(sessionStorage.getItem("user"));

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
      message: t("addNewCarButton.successMessage"),
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
  height: max-content;
  width: max-content;
}
</style>
