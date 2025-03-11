<?php

namespace App\Services;

use App\Models\Transaction;
use Illuminate\Http\Request;

class TransactionService
{
    public function listByUser($userId)
    {
        return Transaction::where('user_id', $userId)->get();
    }

    public function createTransaction(array $data)
    {
        return Transaction::create($data);
    }

    public function updateTransaction(Transaction $transaction, array $data)
    {
        $transaction->update($data);
        return $transaction;
    }

    public function deleteTransaction(Transaction $transaction)
    {
        return $transaction->delete();
    }
    public function listByUserWithFilters($userId, array $filters = [])
{
    $query = Transaction::where('user_id', $userId);

    if (isset($filters['type']) && in_array($filters['type'], ['entrada', 'saida'])) {
         $query->where('type', $filters['type']);
    }

    if (isset($filters['min_value'])) {
         $query->where('value', '>=', $filters['min_value']);
    }

    if (isset($filters['max_value'])) {
         $query->where('value', '<=', $filters['max_value']);
    }

    return $query->get();
}

}
