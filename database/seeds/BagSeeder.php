<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class BagSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('bag')->truncate();

        DB::table('bag')->insert([
            'title' => 'Герма оранжевая маленькая',
            'number' => '1',
            'desc' => 'триторн',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма зеленая средняя',
            'number' => '2',
            'desc' => 'сплав, порвана',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма синяя маленькая',
            'number' => '1',
            'desc' => 'тритон',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма синяя средняя',
            'number' => '2',
            'desc' => 'тритон',
        ]);
        DB::table('bag')->insert([
            'title' => 'Герма красная большая',
            'number' => '2',
            'desc' => 'тритон',
        ]);
        DB::table('bag')->insert([
            'title' => 'Герма желтая большая',
            'number' => '1',
            'desc' => 'тритон',
        ]);
        DB::table('bag')->insert([
            'title' => 'Герма черная большая',
            'number' => '2',
            'desc' => 'сплав',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма акваграфика 150',
            'number' => '2',
            'desc' => 'акваграфика',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма зеленая большая',
            'number' => '4',
            'desc' => 'сплав',
        ]);
    }
}
