<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class SchedulerNumberOfPositions extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('scheduler', function($table)
        {
            $table->smallInteger('number_of_positions')->default(2);
            $table->string('city_of_renting')->default('г. Приозерск');
            $table->string('place_of_renting')->default('оз. Вуокса');
            $table->string('city_of_return')->default('г. Приозерск');
            $table->string('place_of_return')->default('оз. Вуокса');
            $table->string('passport');
            $table->string('passport_name');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        //
    }
}
