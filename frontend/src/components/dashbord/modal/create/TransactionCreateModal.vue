<template>
  <v-dialog
    :model-value="modelValue"
    persistent
    max-width="600px"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title>Nova Transação</v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-select
            v-model="transaction.category_id"
            :items="categoryStore.categories"
            label="Categoria"
            item-title="name"
            item-value="id"
          />
          <v-select v-model="transaction.type" :items="types" label="Tipo" />
          <v-text-field v-model="transaction.value" label="Valor (R$)" type="number" />
          <v-text-field v-model="transaction.description" label="Descrição" />
        </v-form>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="saveTransaction">Salvar</v-btn>
        <v-btn @click="$emit('update:modelValue', false)">Cancelar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <v-snackbar v-model="snackbar" color="green" timeout="6000" location="top right" >
    {{ succesMessage }}
  </v-snackbar>
</template>

<script setup lang="ts">
import { defineEmits, ref, defineProps, onMounted } from 'vue'
import { useTransactionStore } from '../../../../stores/transaction'
import { useCategoryStore } from '../../../../stores/category'
import type { TransactionCreateData } from '../../../../types/transaction.types'

defineProps({
  modelValue: Boolean,
})

const transactionStore = useTransactionStore()
const categoryStore = useCategoryStore()
const emit = defineEmits(['update:modelValue'])

const snackbar = ref(false)
const succesMessage = ref('Transação criada com sucesso!')

const types = ref(['entrada', 'saida'])

const transaction = ref<TransactionCreateData>({
  type: '',
  value: null,
  category_id: null,
  description: '',
})

async function saveTransaction() {
  try {
    if (!transaction.value.category_id) {
      throw new Error('Por favor, selecione uma categoria.')
    }

    const data = {
      ...transaction.value,
      value: Number(transaction.value.value),
    }

    await transactionStore.postTransaction(data
    )
    snackbar.value = true
    emit('update:modelValue', false)
    transaction.value = {
      type: '',
      value: 0,
      category_id: null,
      description: '',
    }
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error('Erro ao salvar transação:', error.message)
    } else {
      console.error('Erro ao salvar transação:', error)
    }
  }
}

onMounted(async () => {
  await categoryStore.getCategories()
  console.log(categoryStore.categories)
})
</script>
