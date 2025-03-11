<template>
  <v-dialog
    :model-value="modelValue"
    persistent
    max-width="400px"
    @update:model-value="$emit('update:modelValue', $event)"
  >
    <v-card>
      <v-card-title class="text-h6">Confirmar Exclusão</v-card-title>
      <v-card-text>
        Você realmente deseja excluir a transação de
        <strong>{{ transactionData?.type === 'entrada' ? 'Entrada' : 'Saída' }}</strong>
        com valor de R$ {{ transactionData?.value }}?
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="primary" @click="$emit('confirm')">
          Sim
        </v-btn>
        <v-btn color="error" @click="$emit('update:modelValue', false)">
          Não
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { defineProps, defineEmits } from 'vue';
import type { TransactionUpdateData } from '../../../../types/transaction.types';



defineProps({
  modelValue: Boolean,
  transactionData: {
    type: Object as () => TransactionUpdateData | null,
    default: null,
  },
});

defineEmits(['update:modelValue', 'confirm']);
</script>
