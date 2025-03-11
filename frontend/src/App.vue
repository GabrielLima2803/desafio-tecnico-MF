<script setup lang="ts">
import { LoadingPage } from './components'
import { useLoadingStore } from './stores/loading';
const loadingStore = useLoadingStore()
</script>

<template>
  <v-app>
    <v-theme-provider>
      <LoadingPage v-if="loadingStore.isLoading" />
      <RouterView />
    </v-theme-provider>
  </v-app>
</template>

<style scoped>

</style>
