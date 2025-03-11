import type { TransactionData, TransactionCreateData, TransactionUpdateData } from "@/types/transaction.types";
import { defineStore } from "pinia";
import { computed, reactive } from "vue";
import TransactionService from "../services/transaction";

export const useTransactionStore = defineStore("transaction", () => {
  const state = reactive({
    transactions: [] as TransactionData[],
    error: null as string | null,
    loading: false
  });

  const transactions = computed(() => state.transactions);

  async function getTransactions(filters = {}) {
    try {
      state.loading = true;
      const response = await TransactionService.getTransactions(filters);
      state.transactions = response.data;
    } catch (error) {
      state.error = 'Erro ao carregar transações. Tente novamente mais tarde.';
      console.error('Erro ao buscar transações:', error);
    } finally {
      state.loading = false;
    }
  }

  async function postTransaction(transactionData: TransactionCreateData) {
    try {
      state.loading = true;
      await TransactionService.createTransaction(transactionData);
      await getTransactions();
    } catch (error) {
      state.error = 'Erro ao criar transação. Verifique os dados e tente novamente.';
      console.error('Erro ao criar transação:', error);
      throw error;
    } finally {
      state.loading = false;
    }
  }

  async function updateTransaction(id: number, transactionData: TransactionUpdateData) {
    try {
      state.loading = true;
      await TransactionService.updateTransaction(id, transactionData);
      await getTransactions();
    } catch (error) {
      state.error = 'Erro ao atualizar transação. Tente novamente mais tarde.';
      console.error('Erro ao atualizar transação:', error);
      throw error;
    } finally {
      state.loading = false;
    }
  }

  async function deleteTransaction(id: number) {
    try {
      state.loading = true;
      await TransactionService.deleteTransaction(id);
      await getTransactions();
    } catch (error) {
      state.error = 'Erro ao excluir transação. Tente novamente mais tarde.';
      console.error('Erro ao excluir transação:', error);
      throw error;
    } finally {
      state.loading = false;
    }
  }

  return {
    transactions,
    state,
    getTransactions,
    postTransaction,
    updateTransaction,
    deleteTransaction
  };
});
