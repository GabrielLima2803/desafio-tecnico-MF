<?php

namespace App\Exports;

use Maatwebsite\Excel\Concerns\FromCollection;
use Maatwebsite\Excel\Concerns\WithHeadings;
use Maatwebsite\Excel\Concerns\WithStyles;
use PhpOffice\PhpSpreadsheet\Worksheet\Worksheet;

class TransactionsExport implements FromCollection, WithHeadings, WithStyles
{
    protected $transactions;

    public function __construct($transactions)
    {
        $this->transactions = collect($transactions);
    }

    public function collection()
    {
        return $this->transactions->map(function ($transaction) {
            return [
                'Data' => $transaction['created_at'],
                'Descrição' => $transaction['description'],
                'Categoria' => $transaction['category'],
                'Tipo' => ucfirst($transaction['type']),
                'Valor (R$)' => (float)$transaction['value'],
                'Status' => $transaction['status'] ? 'Ativa' : 'Inativa'
            ];
        });
    }

    public function headings(): array
    {
        return [
            'Data',
            'Descrição',
            'Categoria',
            'Tipo',
            'Valor (R$)',
            'Status'
        ];
    }

    public function styles(Worksheet $sheet)
    {
        return [
            1 => [
                'font' => [
                    'bold' => true,
                    'color' => ['rgb' => 'FFFFFF']
                ],
                'fill' => [
                    'fillType' => 'solid',
                    'startColor' => ['rgb' => '4F81BD']
                ]
            ],
            'A:F' => [
                'alignment' => [
                    'wrapText' => true,
                    'vertical' => 'top'
                ]
            ]
        ];
    }
}