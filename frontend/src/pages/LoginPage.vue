<template>
  <q-page class="flex flex-center column">
    <div v-if="!loading" class="flex flex-center column" style="width: 100%">
      <h3>{{ t("login.title") }}</h3>

      <q-form @submit="onSubmit" class="form">
        <q-input
          class="input"
          v-model="email"
          :label="t('login.email')"
          type="text"
          name="email"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || t('login.validation.required'),
            (val) =>
              (val && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) ||
              t('login.validation.email'),
          ]"
        />
        <q-input
          class="input"
          v-model="password"
          style="width: 100%"
          :type="viewPassword ? 'text' : 'password'"
          name="password"
          :label="t('login.password')"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || t('login.validation.required'),
          ]"
        >
          <template v-slot:append>
            <q-icon
              name="visibility"
              style="cursor: pointer; width: 20px"
              @click="togglePassword"
            />
          </template>
        </q-input>
        <q-btn
          class="input"
          type="submit"
          :label="t('login.button')"
          color="primary"
        />
      </q-form>

      <p>
        {{ t("login.withoutAccount") }}.
        <span class="register-link" @click="router.push('/register')">{{
          t("login.signIn")
        }}</span>
      </p>
    </div>
    <div v-else>
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import UserService from "src/services/user.service";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const router = useRouter();
const $q = useQuasar();

const email = ref(null);
const password = ref(null);
const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;
    const response = await UserService.login({
      email: email.value,
      password: password.value,
    });
    sessionStorage.setItem(
      "user",
      JSON.stringify({
        email: response.data.email,
        role: response.data.role,
        _id: response.data._id,
        name: response.data.name,
      })
    );
    sessionStorage.setItem("token", response.data.jwt);
    loading.value = false;

    router.push("/main/dashboard");
  } catch (error) {
    loading.value = false;
    console.log({ error });

    $q.notify({
      type: "negative",
      textColor: "white",
      message: error.response.data,
      position: "top",
    });
  }
};

const viewPassword = ref(false);
const togglePassword = () => {
  viewPassword.value = !viewPassword.value;
};

defineOptions({
  name: "LoginPage",
});
</script>

<style>
.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 90%;
  max-width: 350px;
}

.input {
  width: 100%;
  margin-bottom: 10px;
}

.input-label {
  margin: 0;
}

.password-container {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
}

.register-link {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
