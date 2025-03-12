<template>
  <v-app>
    <SideBar @change-view="handleChangeView"/>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12">
            <component :is="currentViewComponent" />
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup lang="ts">
import { computed, defineOptions, ref } from 'vue'
import TransactionsList from "./list/TransactionsList.vue";
import TransactionsCharts from './charts/TransactionsCharts.vue';
import SideBar from "./sidebar/SideBar.vue";

const currentView = ref('list')

const currentViewComponent = computed(() =>
  currentView.value === 'list' ? TransactionsList : TransactionsCharts
)

function handleChangeView(view: string) {
  currentView.value = view
}

defineOptions({
  name: "DefaultDashboard"
})
</script>
