<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateScheduleTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('scheduler', function($table)
        {
            $table->increments('id');
            $table->timestamps();
            $table->datetime('begin_rent')->nullable();
            $table->datetime('end_rent')->nullable();
            $table->string('phone')->nullable();
            $table->string('name')->nullable();
            $table->string('time')->nullable();
            $table->decimal('price',10,2)->nullable();
            $table->tinyInteger('confirmed',1)->default(0);
            $table->text('note');
        });

        Schema::create('scheduler_kayak', function($table)
        {
            $table->integer('scheduler_id');
            $table->integer('kayak_id');
        });

        Schema::create('scheduler_equipment', function($table)
        {
            $table->integer('scheduler_id');
            $table->integer('equipment_id');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('schedule');
        Schema::dropIfExists('schedule_kayak');
        Schema::dropIfExists('schedule_equipment');
    }
}
