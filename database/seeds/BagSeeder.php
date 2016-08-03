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
            'title' => 'Герма черная 150',
            'number' => '1',
            'desc' => 'сплав',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма желтая 150',
            'number' => '1',
            'desc' => 'тритон',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма красная 120',
            'number' => '1',
            'desc' => 'тритон. баул',
        ]);

        DB::table('bag')->insert([
            'title' => 'Герма акваграфика 150',
            'number' => '2',
            'desc' => 'акваграфика',
        ]);

    }
}
