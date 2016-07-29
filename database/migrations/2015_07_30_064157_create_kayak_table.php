<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateKayakTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('kayak', function($table)
        {
            $table->increments('id');
            $table->timestamps();
            $table->string('title', 255)->nullable();
            $table->string('photo')->nullable();
            $table->text('desc')->nullable();
            $table->decimal('price',6,2)->nullable();
            $table->string('vendor_code')->nullable();
            $table->string('color')->nullable();
            $table->text('note');
            $table->smallInteger('order')->default(1);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::drop('kayak');
    }
}
