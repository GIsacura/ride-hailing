<template>
  <!-- ...... -->
  <q-select
    outlined
    v-model="locale"
    :options="localeOptions"
    dense
    borderless
    emit-value
    map-options
    options-dense
    style="min-width: 150px"
  />
  <!-- ...... -->
</template>

<script setup>
import { useI18n } from "vue-i18n";

const { locale } = useI18n({ useScope: "global" });

const localeOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];
</script>
