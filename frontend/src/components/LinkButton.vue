<template lang="">
  <div>
    <button @click=onNavigate>{{props.title}}</button>
  </div>
</template>
<script setup>
import { useRouter } from 'vue-router';
import { defineProps } from 'vue';

const router = useRouter();

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  link: {
    type: String,
    default: '#'
  }})

  const onNavigate = () => {
    router.push(props.link);
  }
</script>
<style lang="">

</style>
