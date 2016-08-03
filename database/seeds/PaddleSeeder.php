<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class PaddleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('paddle')->truncate();

        DB::table('paddle')->insert([
            'title' => 'Дюраль 180 см',
            'number' => 10,
        ]);
        DB::table('paddle')->insert([
            'title' => 'Дюраль 190 см',
            'number' => 10,
        ]);

    }
}
