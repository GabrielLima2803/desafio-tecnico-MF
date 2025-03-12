<template>
  <v-navigation-drawer
    app
    permanent
    :width="isExpanded ? 250 : 95"
    :mini-variant="!isExpanded"
    @mouseover="isExpanded = true"
    @mouseleave="isExpanded = false"
  >
    <v-container class="d-flex flex-column fill-height">
      <div>
        <v-list-item class="mb-4">
          <v-list-item-title class="text-h6">
            <v-icon icon="mdi-account-circle" class="mr-2"></v-icon>
            <span v-show="isExpanded">{{ userStore.user.name }}</span>
          </v-list-item-title>
        </v-list-item>

        <v-list density="compact" class="mb-4">
          <v-list-item @click="showCategoryModal = true">
            <template #prepend>
              <v-icon icon="mdi-tag-plus"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Nova Categoria</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showTransactionModal = true">
            <template #prepend>
              <v-icon icon="mdi-cash-plus"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Nova Transação</v-list-item-title>
          </v-list-item>
          <v-list-item @click="showCategoryListModal = true">
            <template #prepend>
              <v-icon icon="mdi-view-list"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Categorias</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list density="compact">
          <v-list-item @click="changeView('list')">
            <template #prepend>
              <v-icon icon="mdi-format-list-bulleted"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Transações</v-list-item-title>
          </v-list-item>
          <v-list-item @click="changeView('charts')">
            <template #prepend>
              <v-icon icon="mdi-chart-bar"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Gráficos</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list density="compact">
          <v-list-item @click="toggleDark">
            <template #prepend>
              <v-icon :icon="isDark ? 'mdi-weather-night' : 'mdi-white-balance-sunny'"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Dark Mode</v-list-item-title>
          </v-list-item>
        </v-list>

        <v-list density="compact">
          <v-list-item @click="handleExportPdf">
            <template #prepend>
              <v-icon icon="mdi-file-pdf-box"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Exportar PDF</v-list-item-title>
          </v-list-item>

          <v-list-item @click="handleExportExcel">
            <template #prepend>
              <v-icon icon="mdi-file-excel-box"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Exportar Excel</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>



      <div class="mt-auto">
        <v-divider class="mb-2"></v-divider>
        <v-list density="compact">
          <v-list-item @click="logout">
            <template #prepend>
              <v-icon icon="mdi-logout"></v-icon>
            </template>
            <v-list-item-title v-show="isExpanded">Logout</v-list-item-title>
          </v-list-item>
        </v-list>
      </div>
    </v-container>

    <CategoryCreateModal
      v-model="showCategoryModal"
      @close="showCategoryModal = false"
    />
    <TransactionCreateModal
      v-model="showTransactionModal"
      @close="showTransactionModal = false"
    />
    <CategoryListModal
      v-model="showCategoryListModal"
      @close="showCategoryListModal = false"
    />
  </v-navigation-drawer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { defineEmits } from 'vue'
import { useAuthStore } from '../../../stores/auth'
import { useUserStore } from '../../../stores/user'
import { useExportStore } from '../../../stores/export'
import { useTheme } from 'vuetify'
import CategoryCreateModal from "../modal/create/CategoryCreateModal.vue"
import TransactionCreateModal from "../modal/create/TransactionCreateModal.vue"
import CategoryListModal from "../modal/others/CategoryListModal.vue"

const emit = defineEmits(['change-view'])

const theme = useTheme()
const authStore = useAuthStore()
const userStore = useUserStore()
const exportStore = useExportStore()

const isDark = ref(theme.global.current.value.dark)

const isExpanded = ref(true)
const showCategoryModal = ref(false)
const showTransactionModal = ref(false)
const showCategoryListModal = ref(false)

const snackbarPdf = ref(false)
const snackbarExcel = ref(false)
const errorSnackbar = ref(false)
const errorMessage = ref('')


function toggleDark() {
  isDark.value = !isDark.value
  theme.global.name.value = isDark.value ? 'dark' : 'light'
  localStorage.setItem('darkTheme', JSON.stringify(isDark.value))
}

async function logout() {
  await authStore.logoutUser()
}

const savedTheme = localStorage.getItem('darkTheme')
if (savedTheme !== null) {
  isDark.value = JSON.parse(savedTheme)
  theme.global.name.value = isDark.value ? 'dark' : 'light'
}

async function handleExportPdf() {
  try {
    await exportStore.downloadPdf()
    snackbarPdf.value = true
  } catch (error: unknown) {
    errorMessage.value = 'Erro ao exportar PDF'
    errorSnackbar.value = true
    console.error(error)
  }
}

async function handleExportExcel() {
  try {
    await exportStore.downloadExcel()
    snackbarExcel.value = true
  } catch (error: unknown) {
    errorMessage.value = 'Erro ao exportar Excel'
    errorSnackbar.value = true
    console.error(error)
  }
}

onMounted(async () => {
  await userStore.getUser()
})

function changeView(view: string) {
  emit('change-view', view)
}
</script>

<style scoped>
.v-list-item {
  border-radius: 8px;
  margin: 4px 0;
  transition: all 0.3s ease;
  min-height: 40px;
}

.v-list-item:hover {
  background-color: rgba(var(--v-theme-primary), 0.1);
}

.v-list-item__prepend {
  margin-right: 12px;
}

.text-h6 {
  font-weight: 600;
  color: rgba(var(--v-theme-primary));
  white-space: nowrap;
}

.v-navigation-drawer {
  transition: all 0.3s ease !important;
}

.v-list-item-title {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
