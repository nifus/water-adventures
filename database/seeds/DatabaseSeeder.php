<?php

use Illuminate\Database\Seeder;
use Illuminate\Database\Eloquent\Model;

class DatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Model::unguard();

        //$this->call(KayakSeeder::class);
        //$this->call(EquipmentSeeder::class);
        $this->call(PaddleSeeder::class);
        $this->call(BagSeeder::class);

        Model::reguard();
    }
}
