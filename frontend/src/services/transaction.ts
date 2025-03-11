import axios from "axios";
import type {TransactionCreateData, TransactionUpdateData}  from './../types/transaction.types';

class TransactionService {
  async createTransaction(dataTransaction: TransactionCreateData) {
    console.log(dataTransaction);
    const response = await axios.post("/api/transactions", {
      ...dataTransaction
    });
    return response.data;
  }
  async getTransactions(filters = {}) {
    const response = await axios.get("/api/transactions", { params: filters });
    return response.data;
  }

  async deleteTransaction(id: number) {
    const response = await axios.delete(`/api/transactions/${id}`);
    return response.data;
  }
  async updateTransaction(id: number, dataTransaction: TransactionUpdateData) {
    const response = await axios.put(`/api/transactions/${id}`, {
      ...dataTransaction
    });
    return response.data;
  }
}

export default new TransactionService();
