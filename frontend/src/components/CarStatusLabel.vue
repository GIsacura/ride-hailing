<template>
  <span :class="[statusInfo[props.status].style]">{{
    statusInfo[props.status].name
  }}</span>
</template>
<script setup>
const props = defineProps({
  status: {
    type: String,
    required: true,
  },
});
const statusInfo = {
  available: { name: "Disponible", style: "available" },
  "in-service": { name: "En servicio", style: "in-service" },
  "in-maintenance": { name: "En mantenimiento", style: "in-maintenance" },
};

defineOptions({
  name: "CarStatusLabel",
});
</script>
<style>
.available {
  background-color: rgba(0, 128, 0, 0.4);
  /* color: white; */
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}
.in-service {
  background-color: rgba(255, 0, 0, 0.4);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}
.in-maintenance {
  background-color: rgba(255, 165, 0, 0.4);
  color: white;
  padding: 5px;
  border-radius: 5px;
  font-size: 12px;
}
</style>
