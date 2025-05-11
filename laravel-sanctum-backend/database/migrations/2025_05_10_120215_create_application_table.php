<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('application', function (Blueprint $table) {
            $table->id(); // ID
            $table->string('name');
            $table->enum('communication_method', ['call', 'chat']);
            $table->string('contacts');
            $table->string('communication_time')->nullable();
            $table->string('direction')->nullable();
            $table->string('budget')->nullable();
            $table->text('notes')->nullable();
            $table->string('status')->default('Новая');
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
        Schema::dropIfExists('application');
    }
};
