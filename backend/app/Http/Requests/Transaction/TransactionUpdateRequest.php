<?php

namespace App\Http\Requests\Transaction;

use Illuminate\Foundation\Http\FormRequest;

class TransactionUpdateRequest extends FormRequest
{
    public function authorize()
    {
        return true;
    }

    public function rules()
    {
        return [
            'category_id' => 'sometimes|exists:categories,id',
            'type'        => 'sometimes|in:entrada,saida',
            'value'       => 'sometimes|numeric|min:0.01',
            'description' => 'sometimes|string',
        ];
    }
}
