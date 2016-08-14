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
            'title' => 'Дюраль маленькие',
            'number' => 2,
        ]);
        DB::table('paddle')->insert([
            'title' => 'Дюраль очень большое',
            'number' => 1,
        ]);
        DB::table('paddle')->insert([
            'title' => 'Дюраль среднее',
            'number' => 7,
        ]);
        DB::table('paddle')->insert([
            'title' => 'Дюраль большие',
            'number' => 6,
        ]);
        DB::table('paddle')->insert([
            'title' => 'пластик',
            'number' => 5,
        ]);
    }
}
