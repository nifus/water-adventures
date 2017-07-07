<?php

use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class AlterCancelStatus extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        \DB::statement("ALTER TABLE  `scheduler` CHANGE  `status`  `status` ENUM(  'new',  'working',  'closed',  'canceled' ) CHARACTER SET utf8 COLLATE utf8_unicode_ci NOT NULL DEFAULT 'new';");
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
