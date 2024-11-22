<template>
  <q-list bordered separator>
    <div v-for="(item, index) in data" :key="item._id">
      <q-expansion-item
        expand-separator
        icon="las la-car-side"
        :label="`Vehículo ${index + 1}`"
      >
        <p>Marca: {{ item.brand }}</p>
        <p>Modelo: {{ item.model }}</p>
        <p>Estado: <CarStatusLabel :status="item.status" /></p>
      </q-expansion-item>
    </div>
  </q-list>
</template>

<script setup>
import CarStatusLabel from "src/components/CarStatusLabel.vue";

const props = defineProps({
  data: {
    type: Array,
    required: true,
  },
});
</script>

<style>
.card {
  width: 100%;
  max-width: 250px;
  background-color: #3cd4ae;
  padding: 10px;
}
</style>
