<?php
namespace App\Http\Controllers;

use App\Http\Requests\StoreSaleRequest;
use App\Models\Sale;
use App\Models\SaleItem;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Carbon\Carbon;

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

    public function getTodaySales()
    {
        $today = Carbon::now()->toDateString(); // Toma la fecha actual del sistema

        $sales = Sale::with(['items'])
            ->whereDate('sale_date', $today)
            ->get();

        $report = [];

        foreach ($sales as $sale) {
            foreach ($sale->items as $item) {
                $productName = $item->product_name;

                if (!isset($report[$productName])) {
                    $report[$productName] = [
                        'date' => $today,
                        'dish' => $productName,
                        'quantity' => 0,
                        'total' => 0,
                    ];
                }

                $report[$productName]['quantity'] += $item->quantity;
                $report[$productName]['total'] += $item->quantity * $item->price;
            }
        }

        return response()->json(array_values($report));
    }
}
