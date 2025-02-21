<?php

namespace Database\Factories;

use App\Models\Sale;
use Illuminate\Database\Eloquent\Factories\Factory;

class SaleFactory extends Factory
{
    protected $model = Sale::class;

    public function definition(): array
    {
        return [
            'total' => $this->faker->randomFloat(2, 10, 500),
            'sale_date' => now(),
        ];
    }
}
