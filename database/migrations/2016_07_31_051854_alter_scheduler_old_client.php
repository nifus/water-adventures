<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterSchedulerOldClient extends Migration
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
            $table->decimal('pledge',8,2)->nullable();
            $table->tinyInteger('old_client')->default(1);
            $table->enum('status',['new','working','closed'])->default('news');
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
