<?php

use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

class CreateAppsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('apps', function (Blueprint $table) {
            $table->increments('id');

            $table->string('name')->nullable(false);
            $table->longtext('one_signal_key')->nullable(false);
            $table->longtext('one_signal_rest_api_key')->nullable(true);            
            /**
             * Possible Values
             *   - ios => 0
             *   - android => 1
             */
            $table->integer('os')->nullable(false);            
            $table->boolean('enabled')->default(true);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('apps');
    }
}
