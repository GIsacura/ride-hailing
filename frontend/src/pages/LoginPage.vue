<template>
  <q-page class="flex flex-center column">
    <h3>Iniciar sesión</h3>

    <q-form @submit="onSubmit" class="form">
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
        :rules="[(val) => (val && val.length > 0) || 'Este campo es requerido']"
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
        label="Iniciar sesión"
        color="primary"
      />
    </q-form>

    <p>
      ¿No tienes cuenta?.
      <span class="register-link" @click="router.push('/register')"
        >Regístrate</span
      >
    </p>
  </q-page>
</template>

<script setup>
import { useQuasar } from "quasar";
import { ref } from "vue";
import { useRouter } from "vue-router";
import UserService from "src/services/user.service";

const router = useRouter();
const $q = useQuasar();

const email = ref(null);
const password = ref(null);

const onSubmit = async () => {
  try {
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

    router.push("/main/dashboard");
  } catch (error) {
    console.log({ error });

    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: error.response.data,
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
