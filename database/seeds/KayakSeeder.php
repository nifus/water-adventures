<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class KayakSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('kayak')->truncate();

        DB::table('kayak')->insert([
            'title' => 'Ладога 2',
            'desc' => 'Двух местная каркасная байдарка',
            'price' => 1500,
            'vendor_code' => 'ld_01',
            'color' => 'yellow',
            'note' => '2015 год. новая',
            'order' => 1,
        ]);
        DB::table('kayak')->insert([
            'title' => 'Ладога 2',
            'desc' => 'Двух местная каркасная байдарка',
            'price' => 1500,
            'vendor_code' => 'ld_02',
            'color' => 'red',
            'note' => '2016 год. новая',
            'order' => 2,
        ]);
        DB::table('kayak')->insert([
            'title' => 'Ладога 2',
            'desc' => 'Двух местная каркасная байдарка',
            'price' => 1500,
            'vendor_code' => 'ld_03',
            'color' => 'red',
            'note' => '2016 год. новая',
            'order' => 3,
        ]);
        DB::table('kayak')->insert([
            'title' => 'Ладога 2',
            'desc' => 'Двух местная каркасная байдарка',
            'price' => 1500,
            'vendor_code' => 'ld_04',
            'color' => 'blue',
            'note' => '2016 год. юзанная',
            'order' => 4,
        ]);
        DB::table('kayak')->insert([
            'title' => 'Ладога 2',
            'desc' => 'Двух местная каркасная байдарка',
            'price' => 1500,
            'vendor_code' => 'ld_05',
            'color' => 'blue',
            'note' => '2016 год. юзанная',
            'order' => 5,
        ]);

        DB::table('kayak')->insert([
            'title' => 'Нева',
            'desc' => 'Трех-местная каркасная байдарка',
            'price' => 1200,
            'vendor_code' => 'ld_06',
            'color' => 'blue',
            'note' => '2016 год. юзанная',
            'order' => 6,
        ]);
        DB::table('kayak')->insert([
            'title' => 'Нева',
            'desc' => 'Трех-местная каркасная байдарка',
            'price' => 1200,
            'vendor_code' => 'ld_07',
            'color' => 'green',
            'note' => '2016 год. юзанная',
            'order' => 7,
        ]);
        DB::table('kayak')->insert([
            'title' => 'Нева',
            'desc' => 'Трех-местная каркасная байдарка',
            'price' => 1200,
            'vendor_code' => 'ld_08',
            'color' => 'military',
            'note' => '2016 год. юзанная',
            'order' => 8,
        ]);

        DB::table('kayak')->insert([
            'title' => 'Викинг 4.7',
            'desc' => 'Двух местная каркасная байдарка.

                            Идеально подходит для начинающих. Волны для неё не проблема.
                            Легка в управлении',
            'price' => 1000,
            'order' => 9,
            'vendor_code' => 'ld_09',
            'color' => 'yellow',
            'note' => '2015 год. новая',
        ]);

        DB::table('kayak')->insert([
            'title' => 'Викинг 4.7',
            'desc' => 'Двух местная каркасная байдарка.

                            Идеально подходит для начинающих. Волны для неё не проблема.
                            Легка в управлении',
            'price' => 1000,
            'order' => 9,
            'vendor_code' => 'ld_10',
            'color' => 'red',
            'note' => '2015 год. новая',
        ]);
    }
}
