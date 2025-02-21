<?php

namespace Tests\Feature;

use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;
use App\Models\Sale;
use App\Models\SaleItem;

class SaleControllerTest extends TestCase
{
    use RefreshDatabase;

    public function test_it_can_register_a_sale()
    {
        $data = [
            'total' => 25.50,
            'items' => [
                ['name' => 'Burger', 'price' => 5.50, 'quantity' => 3],
                ['name' => 'Fries', 'price' => 2.00, 'quantity' => 2]
            ]
        ];

        $response = $this->postJson('/api/sales', $data);

        $response->assertStatus(201)
            ->assertJsonStructure([
                'message',
                'sale' => ['id', 'total', 'sale_date', 'items']
            ]);

        $this->assertDatabaseHas('sales', ['total' => 25.50]);
    }

    public function test_it_can_list_sales()
    {
        Sale::factory()->has(SaleItem::factory()->count(2), 'items')->create();

        $response = $this->getJson('/api/sales');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['id', 'total', 'sale_date', 'items']
            ]);
    }

    public function test_it_can_get_today_sales()
    {
        $sale = Sale::factory()->create(['sale_date' => now()]);
        SaleItem::factory()->count(2)->create(['sale_id' => $sale->id]);

        $response = $this->getJson('/api/salestoday');

        $response->assertStatus(200)
            ->assertJsonStructure([
                '*' => ['date', 'dish', 'quantity', 'total']
            ]);
    }
}
