<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\TransactionController;
use App\Http\Controllers\CategoryController;
use Illuminate\Support\Facades\Route;

Route::middleware('api')->post('register', [AuthController::class, 'register']);
Route::middleware('api')->post('login', [AuthController::class, 'login']);




Route::middleware('auth:sanctum')->group(function () {
    Route::post('logout', [AuthController::class, 'logout']);
    Route::get('user/me', [AuthController::class, 'me']);
    Route::apiResource('transactions', TransactionController::class);

    Route::apiResource('categories', CategoryController::class)->except(['update', 'show']);
});
