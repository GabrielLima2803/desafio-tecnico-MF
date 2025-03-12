<?php

namespace App\Http\Controllers;

use App\Exports\TransactionsExport;
use App\Models\Transaction;
use Barryvdh\DomPDF\Facade\Pdf;
use Maatwebsite\Excel\Facades\Excel;

class ExportController extends Controller
{
    private function getFormattedTransactions()
    {
        return Transaction::with('category')
            ->latest()
            ->get()
            ->map(function ($transaction) {
                return [
                    'created_at' => $transaction->created_at->format('d/m/Y H:i'),
                    'description' => $transaction->description,
                    'category' => $transaction->category->name,
                    'type' => ucfirst($transaction->type),
                    'value' => (float)$transaction->value,
                    'status' => $transaction->status ? 'Ativa' : 'Inativa'
                ];
            });
    }

    public function exportCSV()
    {
        return Excel::download(
            new TransactionsExport($this->getFormattedTransactions()),
            'transacoes.csv'
        );
    }

    public function exportExcel()
    {
        try {
            $transactions = $this->getFormattedTransactions()->toArray();
            return Excel::download(
                new TransactionsExport($transactions),
                'transacoes.xlsx'
            );
        } catch (\Exception $e) {
            return response()->json([
                'error' => 'Erro ao gerar arquivo Excel'
            ], 500);
        }
    }

    public function exportPDF()
    {
        $transactions = $this->getFormattedTransactions();

        $pdf = Pdf::loadView('exports.transactions', compact('transactions'))
            ->setPaper('a4', 'landscape')
            ->setOptions([
                'defaultFont' => 'sans-serif',
                'isHtml5ParserEnabled' => true,
                'isRemoteEnabled' => true
            ]);

        return $pdf->download('transacoes.pdf');
    }
}