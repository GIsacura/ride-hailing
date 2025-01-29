<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> {{ t("privateHeader.title") }} </q-toolbar-title>

        <LanguageSwitcher />

        <q-btn
          flat
          color="primary"
          text-color="white"
          :label="userInfo.name"
          elevated="false"
        >
          <q-menu>
            <q-list>
              <q-item clickable v-ripple>
                <q-item-section
                  ><q-btn
                    flat
                    dense
                    round
                    icon="logout"
                    icon-right="logout"
                    @click="logout"
                    style="text-transform: capitalize"
                  >
                    {{ t("privateHeader.logout") }}
                  </q-btn>
                </q-item-section>
              </q-item>
            </q-list>
          </q-menu>
        </q-btn>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup>
import { useRouter } from "vue-router";
import { onMounted } from "vue";
import UserService from "src/services/user.service";
import LanguageSwitcher from "src/components/LanguageSwitcher.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();
const userInfo = JSON.parse(sessionStorage.getItem("user"));

defineOptions({
  name: "MainLayout",
});

if (!sessionStorage.getItem("token")) {
  router.push("/login");
}

const logout = () => {
  sessionStorage.removeItem("token");
  sessionStorage.removeItem("user");
  router.push("/login");
};

onMounted(async () => {
  const response = await UserService.isValidToken();

  if (!response) {
    logout();
  }
});
</script>
