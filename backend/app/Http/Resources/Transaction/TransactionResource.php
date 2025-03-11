<?php

namespace App\Http\Resources\Transaction;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class TransactionResource extends JsonResource
{
    public function toArray(Request $request)
    {
        return [
            'id'          => $this->id,
            'category'    => new \App\Http\Resources\Category\CategoryResource($this->category),
            'type'        => $this->type,
            'value'       => $this->value,
            'description' => $this->description,
            'user_id'     => $this->user_id,
            'created_at'  => $this->created_at,
        ];
    }
}
