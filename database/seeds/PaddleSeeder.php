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
            'title' => 'Дюраль',
            'number' => 16,
        ]);

        DB::table('paddle')->insert([
            'title' => 'Пластик',
            'number' => 5,
        ]);
    }
}
