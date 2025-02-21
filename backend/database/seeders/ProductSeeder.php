<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $products = [
            [
                'name' => 'Charque',
                'price' => 12.00,
                'image' => 'products/charque.png',
            ],
            [
                'name' => 'Pique',
                'price' => 14.00,
                'image' => 'products/pique.png',
            ],
            [
                'name' => 'Pailita',
                'price' => 10.00,
                'image' => 'products/pailita.png',
            ],
        ];

        foreach ($products as $product) {
            DB::table('products')->insert($product);
        }
    }
}
