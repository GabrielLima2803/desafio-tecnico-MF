<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="6">
        <v-card>
          <v-tabs v-model="activeTab" background-color="primary" dark>
            <v-tab>Login</v-tab>
            <v-tab>Register</v-tab>
          </v-tabs>
          <v-card-text>
            <LoginUser v-if="activeTab === 0" />
            <RegisterUser v-if="activeTab === 1" />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import LoginUser from './LoginUser.vue';
import RegisterUser from './RegisterUser.vue';
import { useRouter } from 'vue-router';
const router = useRouter();

onMounted(() => {
  const token = localStorage.getItem("authToken");
  if (token) {
    router.push("/dashbord");
  } else {
    router.push("/");
  }
});

const activeTab = ref(0);
</script>

<style scoped>
.fill-height {
  min-height: 100vh;
}
</style>
