<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
 use HasFactory;

 protected $fillable = [
     'user_id',
     'category_id',
     'type',
     'value',
     'description',
 ];

 protected $casts = [
    'value' => 'float',
    'created_at' => 'datetime:d/m/Y H:i',
    'status' => 'boolean'
];

 public function user()
 {
     return $this->belongsTo(User::class);
 }

 public function category()
 {
     return $this->belongsTo(Category::class);
 }
}
