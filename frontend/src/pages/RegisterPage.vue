<template>
  <q-page class="flex flex-center column">
    <div v-if="!loading" class="flex flex-center column" style="width: 100%">
      <h3>Registro</h3>

      <q-form @submit="onSubmit" class="form">
        <q-input
          class="input"
          v-model="name"
          label="Nombre"
          type="text"
          name="name"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo es requerido',
          ]"
        />
        <q-input
          class="input"
          v-model="email"
          label="Correo"
          type="text"
          name="email"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo es requerido',
            (val) =>
              (val && /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(val)) ||
              'Debe ser un correo valido',
          ]"
        />
        <q-input
          class="input"
          v-model="password"
          style="width: 100%"
          :type="viewPassword ? 'text' : 'password'"
          name="password"
          label="Contraseña"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo es requerido',
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
        <q-input
          class="input"
          v-model="confirmPassword"
          style="width: 100%"
          :type="viewConfirmPassword ? 'text' : 'password'"
          name="password"
          label="Confirmar contraseña"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo es requerido',
            (val) =>
              (val && val === password) || 'Las contraseñas deben coincidir',
          ]"
        >
          <template v-slot:append>
            <q-icon
              name="visibility"
              style="cursor: pointer; width: 20px"
              @click="toggleConfirmPassword"
            />
          </template>
        </q-input>
        <q-select
          class="input"
          v-model="role"
          :options="roleOptions"
          label="Rol"
          outlined
          :rules="[
            (val) => (val && val.length > 0) || 'Este campo es requerido',
          ]"
        />
        <q-btn class="input" type="submit" label="Registrar" color="primary" />
      </q-form>

      <p>
        ¿Ya tienes cuenta?.
        <span class="login-link" @click="router.push('/login')"
          >Inicia sesión</span
        >
      </p>
    </div>

    <div v-else>
      <q-spinner color="primary" size="3em" />
    </div>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserService from "src/services/user.service";

const router = useRouter();
const $q = useQuasar();

const name = ref(null);
const email = ref(null);
const password = ref(null);
const confirmPassword = ref(null);
const role = ref(null);
const viewPassword = ref(false);
const viewConfirmPassword = ref(false);
const loading = ref(false);

const onSubmit = async () => {
  try {
    loading.value = true;
    const response = await UserService.register({
      email: email.value,
      password: password.value,
      name: name.value,
      role: role.value,
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
    loafing.value = false;
    $q.notify({
      type: "negative",
      textColor: "white",
      message: error.response.data,
      position: "top",
    });
  }
};

const roleOptions = ["user", "admin"];

const togglePassword = () => {
  viewPassword.value = !viewPassword.value;
};
const toggleConfirmPassword = () => {
  viewConfirmPassword.value = !viewConfirmPassword.value;
};

defineOptions({
  name: "RegisterPage",
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

.login-link {
  cursor: pointer;
  color: blue;
  text-decoration: underline;
}
</style>
