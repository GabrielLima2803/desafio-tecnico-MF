<template>
  <v-app>
    <SideBar />
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <TransactionsList />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { defineOptions } from 'vue'
import TransactionsList from "./list/TransactionsList.vue";
import SideBar from "./sidebar/SideBar.vue";

defineOptions({
  name: "DefaultDashboard"
})
</script>
