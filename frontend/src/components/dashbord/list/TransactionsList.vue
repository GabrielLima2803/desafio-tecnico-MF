<template>
  <v-container>
    <TransactionEditModal
      v-if="selectedTransaction"
      v-model="showEditModal"
      :transaction-data="selectedTransaction"
    />

    <TransactionDeleteModal
      v-if="transactionToDelete"
      v-model="showDeleteModal"
      :transaction-data="transactionToDelete"
      @confirm="confirmDelete"
    />

    <v-fade-transition>
      <h1 class="text-h4 my-4">Transações</h1>
    </v-fade-transition>

    <v-row class="mb-4" align="center" justify="space-between">
      <v-col cols="12" sm="4">
        <v-select
          v-model="filters.type"
          :items="typeOptions"
          label="Tipo"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="filters.min_value"
          label="Valor Mínimo"
          type="number"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="3">
        <v-text-field
          v-model="filters.max_value"
          label="Valor Máximo"
          type="number"
          clearable
        />
      </v-col>
      <v-col cols="12" sm="2" class="text-right">
        <v-btn color="primary" @click="applyFilters">Filtrar</v-btn>
        <v-btn class="my-1 mr-1" @click="resetFilters">Limpar</v-btn>
      </v-col>
    </v-row>

    <v-list
      ref="scrollContainer"
      two-line
      class="scroll-container"
      @scroll.passive="handleScroll"
    >
      <v-list-item
        v-for="item in visibleTransactions"
        :key="item.id"
        class="my-2 list-item-card"
      >
        <v-list-item-content class="py-2">
          <v-list-item-title class="text-h6 text-primary">
            {{ item.formattedDate }} - {{ item.type === 'entrada' ? '🟢 Entrada' : '🔴 Saída' }}
          </v-list-item-title>
          <v-list-item-subtitle class="text-body-1 mt-1">
            <div class="d-flex align-center">
              <span class="font-weight-medium">Valor:</span>
              <span class="ml-1">R$ {{ item.formattedValue }}</span>
              <v-divider vertical class="mx-3"></v-divider>
              <span class="font-weight-medium">Categoria:</span>
              <span class="ml-1">{{ item.category_name }}</span>
            </div>
            <div class="mt-1">
              <span class="font-weight-medium">Descrição:</span>
              <span class="ml-1">{{ item.description }}</span>
            </div>
          </v-list-item-subtitle>
        </v-list-item-content>

        <v-list-item-action class="d-flex flex-row ga-2">
          <v-btn
            icon="mdi-pencil"
            variant="tonal"
            color="primary"
            density="comfortable"
            @click="editItem(item)"
          ></v-btn>
          <v-btn
            icon="mdi-delete"
            variant="tonal"
            color="error"
            density="comfortable"
            @click="openDeleteModal(item)"
          ></v-btn>
        </v-list-item-action>
      </v-list-item>

      <v-row v-if="loading" class="my-4" justify="center">
        <v-progress-circular indeterminate color="primary"></v-progress-circular>
      </v-row>
    </v-list>
  <v-snackbar v-model="snackbar" color="green" timeout="6000" location="top right" >
    {{ deleteMessage }}
  </v-snackbar>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { useTransactionStore } from '../../../stores/transaction'
import { formatDate } from '../../../helpers/formatDate'
import TransactionEditModal from '../modal/update/TransactionEditModal.vue'
import TransactionDeleteModal from '../modal/others/TransactionDeleteModal.vue'
import type { TransactionUpdateData } from '../../../types/transaction.types'

const transactionStore = useTransactionStore()
const selectedTransaction = ref<TransactionUpdateData | null>(null)
const showEditModal = ref(false)
const loading = ref(false)
const scrollContainer = ref<{ $el: HTMLElement } | null>(null)

const transactionsLimit = ref(15)
const itemsPerPage = 15
const snackbar = ref(false)
const deleteMessage = ref('')

const typeOptions = ref(['entrada', 'saida'])
const filters = ref({
  type: '',
  min_value: '',
  max_value: ''
})

const formattedTransactions = computed(() =>
  transactionStore.transactions.map((item) => ({
    ...item,
    formattedValue: Number(item.value).toFixed(2),
    category_id: item.category.id,
    category_name: item.category.name,
    formattedDate: formatDate(item.created_at),
  }))
)

const visibleTransactions = computed(() =>
  formattedTransactions.value.slice(0, transactionsLimit.value)
)

const handleScroll = (e: Event) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target as HTMLElement
  const threshold = 100

  if (scrollHeight - (scrollTop + clientHeight) < threshold && !loading.value) {
    loadMore()
  }
}

const loadMore = async () => {
  if (formattedTransactions.value.length <= transactionsLimit.value || loading.value) return

  loading.value = true
  try {
    transactionsLimit.value += itemsPerPage
  } finally {
    loading.value = false
  }
}

async function applyFilters() {
  try {
    loading.value = true
    transactionsLimit.value = itemsPerPage
    const params: Record<string, unknown> = {}

    if (filters.value.type) params.type = filters.value.type
    if (filters.value.min_value) params.min_value = Number(filters.value.min_value)
    if (filters.value.max_value) params.max_value = Number(filters.value.max_value)

    await transactionStore.getTransactions(params)
  } finally {
    loading.value = false
  }
}

function resetFilters() {
  filters.value = { type: '', min_value: '', max_value: '' }
  transactionsLimit.value = itemsPerPage
  transactionStore.getTransactions()
}

function editItem(item: TransactionUpdateData) {
  selectedTransaction.value = { ...item, value: Number(item.value) }
  showEditModal.value = true
}

const showDeleteModal = ref(false)
const transactionToDelete = ref<TransactionUpdateData | null>(null)

function openDeleteModal(item: TransactionUpdateData) {
  transactionToDelete.value = item
  showDeleteModal.value = true
}

async function confirmDelete() {
  if (transactionToDelete.value) {
    await transactionStore.deleteTransaction(transactionToDelete.value.id)
    deleteMessage.value = 'Transação deletada com sucesso!'
    snackbar.value = true
    showDeleteModal.value = false
    transactionToDelete.value = null
  }
}

onMounted(async () => {
  await transactionStore.getTransactions()
  const listElement = scrollContainer.value?.$el
  if (listElement) {
    listElement.addEventListener('scroll', handleScroll)
  }
})

onBeforeUnmount(() => {
  const listElement = scrollContainer.value?.$el
  if (listElement) {
    listElement.removeEventListener('scroll', handleScroll)
  }
})
</script>

<style scoped>
.scroll-container {
  max-height: 70vh;
  overflow-y: auto;
}

.list-item-card {
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease;
  cursor: pointer;
  padding: 12px 16px;
}

.list-item-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
}

.v-list-item__action {
  margin-left: 16px !important;
}
</style>