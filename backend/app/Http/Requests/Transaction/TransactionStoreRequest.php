<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class TransactionStoreRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'category_id' => 'required|exists:categories,id',
            'type'        => 'required|in:entrada,saida',
            'value'       => 'required|numeric|min:0.01',
            'description' => 'required|string',
        ];
    }
}
