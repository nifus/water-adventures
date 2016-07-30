<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class EquipmentSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('equipment')->truncate();

        DB::table('equipment')->insert([
            'title' => 'Палатка',
            'number' => '1',
            'price' => 150,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Спальник',
            'number' => '2',
            'price' => 150,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Каремат',
            'number' => '2',
            'price' => 50,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'ПЕрчатки',
            'number' => '4',
            'price' => 100,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Рация',
            'number' => '4',
            'price' => 250,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Go-Pro',
            'number' => '1',
            'price' => 500,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Карта Вуоксы',
            'number' => '3',
            'price' => 0,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Карта Ладоги',
            'number' => '3',
            'price' => 0,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Матрац надувной',
            'number' => '1',
            'price' => 200,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'Гамак',
            'number' => '1',
            'price' => 150,
            'is_fixed_price' => 'yes',
        ]);

        DB::table('equipment')->insert([
            'title' => 'GPS навигатор',
            'number' => '1',
            'price' => 300,
            'is_fixed_price' => 'yes',
        ]);
    }
}
