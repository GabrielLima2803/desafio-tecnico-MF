<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use App\Services\TransactionService;
use App\Http\Requests\Transaction\TransactionStoreRequest;
use App\Http\Requests\Transaction\TransactionUpdateRequest;
use App\Http\Resources\Transaction\TransactionResource;
use Illuminate\Http\Request;

class TransactionController extends Controller
{
    protected $transactionService;

    public function __construct(TransactionService $transactionService)
    {
        $this->transactionService = $transactionService;
    }

    public function index(Request $request)
    {
        $userId = $request->user()->id;
    $filters = $request->only(['type', 'min_value', 'max_value']);
    $transactions = $this->transactionService->listByUserWithFilters($userId, $filters);
    return TransactionResource::collection($transactions);
    }

    public function store(TransactionStoreRequest $request)
    {
        $data = array_merge($request->validated(), ['user_id' => $request->user()->id]);
        $transaction = $this->transactionService->createTransaction($data);
        return new TransactionResource($transaction);
    }

    public function update(TransactionUpdateRequest $request, Transaction $transaction)
    {
        $transaction = $this->transactionService->updateTransaction($transaction, $request->validated());
        return new TransactionResource($transaction);
    }

    public function destroy(Transaction $transaction)
    {
        $this->transactionService->deleteTransaction($transaction);
        return response()->json(['message' => 'Movimentação deletada']);
    }
}
