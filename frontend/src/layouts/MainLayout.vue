<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title> Web administrativa </q-toolbar-title>

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
                    Cerrar sesión
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
