<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\File;

class ProductSeeder extends Seeder
{
    public function run()
    {
        $imagesPath = database_path('seeders/images/');


        $destinationPath = public_path('storage/products/');

        if (!File::exists($destinationPath)) {
            File::makeDirectory($destinationPath, 0777, true, true);
        }

        $products = [
            [
                'name' => 'Charque',
                'price' => 12.00,
                'image' => 'charque.png',
            ],
            [
                'name' => 'Pique',
                'price' => 14.00,
                'image' => 'pique.png',
            ],
            [
                'name' => 'Pailita',
                'price' => 10.00,
                'image' => 'pailita.png',
            ],
        ];

        foreach ($products as $product) {
            $source = $imagesPath . $product['image']; 
            $destination = $destinationPath . $product['image']; 

            if (File::exists($source)) {
                File::copy($source, $destination);
            }

            DB::table('products')->insert([
                'name' => $product['name'],
                'price' => $product['price'],
                'image' => 'products/' . $product['image'],
            ]);
        }
    }
}
