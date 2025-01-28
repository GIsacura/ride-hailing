<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ $t("publicHeader.title") }} </q-toolbar-title>
        <LanguageSwitcher />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import LanguageSwitcher from "../components/LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();

if (sessionStorage.getItem("token")) {
  router.push("/main/dashboard");
}

defineOptions({
  name: "PublicLayout",
});
</script>

<style>
.title {
  font-size: 20px;
}
.header {
  background-color: #3cd4ae;
}
</style>
