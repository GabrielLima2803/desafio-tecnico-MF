<template>
  <v-dialog :model-value="modelValue" persistent max-width="600px" @update:model-value="$emit('update:modelValue', $event)">
    <v-card>
      <v-card-title>
        Editar Transação
      </v-card-title>
      <v-card-text>
        <v-form ref="form">
          <v-select
            v-model="transaction.category_id"
            :items="categoryStore.categories"
            label="Categoria"
            item-title="name"
            item-value="id"
          />
          <v-select
            v-model="transaction.type"
            :items="types"
            label="Tipo"
          />
          <v-text-field
            v-model="transaction.value"
            label="Valor (R$)"
            type="number"
          />
          <v-text-field
            v-model="transaction.description"
            label="Descrição"
          />
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
import { defineEmits, defineProps, ref, watch } from "vue";
import { useTransactionStore } from "../../../../stores/transaction";
import { useCategoryStore } from "../../../../stores/category";
import type { TransactionUpdateData } from "../../../../types/transaction.types";

const props = defineProps({
  modelValue: Boolean,
  transactionData: {
    type: Object as () => TransactionUpdateData,
    required: true
  }
});

const snackbar = ref(false);
const succesMessage = ref("Transação atualizada com sucesso!");

const emit = defineEmits(['update:modelValue']);
const transactionStore = useTransactionStore();
const categoryStore = useCategoryStore();

const types = ref(["entrada", "saida"]);
const transaction = ref<TransactionUpdateData>({
  ...props.transactionData,
  value: Number(props.transactionData.value)
});

watch(() => props.transactionData, (newVal) => {
  transaction.value = {
    ...newVal,
    value: Number(newVal.value)
  };
});

async function saveTransaction() {
  try {
    await transactionStore.updateTransaction(transaction.value.id, {
      id: transaction.value.id,
      type: transaction.value.type,
      value: Number(transaction.value.value),
      category_id: transaction.value.category_id,
      description: transaction.value.description
    });
    succesMessage.value = "Transação atualizada com sucesso!";
    snackbar.value = true;
    emit('update:modelValue', false);
  } catch (error) {
    console.error("Erro ao atualizar transação:", error);
  }
}
</script>

