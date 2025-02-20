<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;

class SaleController extends Controller
{
    public function store(StoreSaleRequest $request): JsonResponse
    {
        $validated = $request->validated();

        $sale = Sale::create([
            'total' => $validated['total'],
            'sale_date' => now(),
        ]);

        foreach ($validated['items'] as $item) {
            SaleItem::create([
                'sale_id' => $sale->id,
                'product_name' => $item['name'],
                'price' => $item['price'],
                'quantity' => $item['quantity'],
            ]);
        }

        return response()->json(['message' => 'Venta registrada correctamente', 'sale' => $sale->load('items')], 201);
    }

    public function index(): JsonResponse
    {
        $sales = Sale::with('items')->orderBy('sale_date', 'desc')->get();
        return response()->json($sales);
    }
}
