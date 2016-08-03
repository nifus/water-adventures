<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateBags extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bag', function($table)
        {
            $table->increments('id');
            $table->string('title', 255)->nullable();
            $table->string('photo', 255)->nullable();
            $table->smallInteger('number')->default(1);
            $table->smallInteger('order')->default(0);
            $table->text('desc');
        });

        Schema::create('paddle', function($table)
        {
            $table->increments('id');
            $table->string('title', 255)->nullable();
            $table->smallInteger('number')->default(1);
            $table->smallInteger('order')->default(0);
            $table->text('desc');
        });

        Schema::create('scheduler_paddle', function($table)
        {
            $table->integer('scheduler_id');
            $table->integer('paddle_id');
        });

        Schema::create('scheduler_bag', function($table)
        {
            $table->integer('scheduler_id');
            $table->integer('bag_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {

        Schema::dropIfExists('bag');
        Schema::dropIfExists('paddle');
        Schema::dropIfExists('scheduler_paddle');
        Schema::dropIfExists('scheduler_bag');

    }
}
