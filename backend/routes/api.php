<?php

use App\Http\Controllers\Api\ProductController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\SaleController;

Route::get('/products', [ProductController::class, 'index']);

Route::post('/products', [ProductController::class, 'store']);

Route::get('/test', function () {
    return response()->json(['message' => 'Test'], 200);
});

Route::post('/sales', [SaleController::class, 'store']);
Route::get('/sales', [SaleController::class, 'index']);
Route::get('/salestoday', [SaleController::class, 'getTodaySales']);