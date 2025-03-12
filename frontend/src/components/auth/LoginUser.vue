<template>
  <v-form ref="loginForm" v-model="loginValid">
    <v-text-field
      v-model="loginData.email"
      label="Email"
      type="email"
      required
    />
    <v-text-field
      v-model="loginData.password"
      label="Senha"
      type="password"
      required
    />
    <v-btn color="primary" class="mt-4" @click="onLogin" :disabled="!loginValid">
      Login
    </v-btn>
  </v-form>

  <v-snackbar v-model="snackbar" color="red" timeout="6000" location="top right" >
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import {useAuthStore} from '../../stores/auth';
import { useRouter } from 'vue-router';

const loginForm = ref();
const loginValid = ref(false);
const router = useRouter();
const loginData = reactive({
  email: '',
  password: ''
});


const authStore = useAuthStore();
const snackbar = ref(false);
const errorMessage = ref('Credenciais inválidas');


onMounted(() => {
  snackbar.value = false;
});
async function onLogin() {
  try {
    await authStore.loginUser(loginData.email, loginData.password);
    router.push("/dashbord");
  } catch (error: unknown) {
    console.error("Erro no login:", error);
    snackbar.value = true;
  }
}
</script>

<style scoped>
</style>
