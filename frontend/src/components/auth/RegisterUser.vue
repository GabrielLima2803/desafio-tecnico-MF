<template>
  <v-form ref="registerForm" v-model="registerValid">
    <v-text-field v-model="registerData.name" label="Nome" required />
    <v-text-field v-model="registerData.email" label="Email" type="email" required />
    <v-text-field v-model="registerData.password" label="Senha" type="password" required />
    <v-btn color="primary" class="mt-4" @click="onRegister" :disabled="!registerValid">
      Registrar
    </v-btn>
  </v-form>

  <v-snackbar v-model="snackbarSuccess" color="green" timeout="6000" location="top right">
    {{ successMessage }}
  </v-snackbar>
  <v-snackbar v-model="snackbarError" color="red" timeout="6000" location="top right">
    {{ errorMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue'
import { useAuthStore } from '../../stores/auth'
import type { CustomError } from '../../types/error.types'

const registerForm = ref()
const registerValid = ref(false)
const registerData = reactive({
  name: '',
  email: '',
  password: '',
})

const snackbarError = ref(false)
const snackbarSuccess = ref(false)
const errorMessage = ref('')
const successMessage = ref('')

const authStore = useAuthStore()

async function onRegister() {
  try {
    await authStore.registerUser(registerData.name, registerData.email, registerData.password)
    console.log('Usuário registrado com sucesso')
    successMessage.value = 'Usuário registrado com sucesso'
    snackbarSuccess.value = true
  } catch (error: unknown) {
    let errorMsg = 'Erro no registro'
    if ((error as CustomError).response) {
      errorMsg = (error as CustomError).response?.data.message || 'Erro desconhecido'
    }
    console.error('Erro no registro:', errorMsg)
    errorMessage.value = errorMsg
    snackbarError.value = true
  }
}
</script>

<style scoped></style>
