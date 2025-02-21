<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Product;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Storage;
use PHPUnit\Framework\Attributes\Test;

class ProductControllerTest extends TestCase
{
    use RefreshDatabase;

    #[Test]
    public function it_can_list_products()
    {
        Product::factory()->count(3)->create();
        $response = $this->getJson('/api/products');
        $response->assertStatus(200)
            ->assertJsonCount(3, 'data');
    }

    #[Test]
    public function it_can_create_a_product()
    {
        Storage::fake('public');
        $image = UploadedFile::fake()->image('laptop.png');
        $data = [
            'name' => 'Laptop',
            'price' => 1200,
            'image' => $image,
        ];

        $response = $this->postJson('/api/products', $data);
        $response->assertStatus(201);

        $this->assertDatabaseHas('products', [
            'name' => 'Laptop',
            'price' => 1200,
        ]);

        Storage::disk('public')->assertExists("products/{$image->hashName()}");
    }
}
