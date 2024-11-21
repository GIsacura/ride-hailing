<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title>
          Ride hailing services
        </q-toolbar-title>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>

defineOptions({
  name: 'PublicLayout'
})
</script>

<style>
  .title{
    font-size: 20px;
  }
  .header{
    background-color: #3cd4ae;;
  }
</style>
