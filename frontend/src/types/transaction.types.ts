export interface TransactionData {
  id: number;
  type: 'entrada' | 'saida';
  value: number;
  category: {
    id: number;
    name: string;
  };
  description: string;
  created_at: string;
}


export interface TransactionCreateData{
  type: '';
  value: number | null;
  category_id: number | null;
  description: string;
}

export type TransactionUpdateData = {
  id: number;
  type: 'entrada' | 'saida';
  value: number;
  category_id: number;
  description: string;
};