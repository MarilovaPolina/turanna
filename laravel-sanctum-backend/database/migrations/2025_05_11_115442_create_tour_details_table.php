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
        Schema::create('tour_details', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->unsignedInteger('tour_id')->unique();

            $table->string('room_class', 35)->nullable();
            $table->string('age_limit', 35)->nullable();
            $table->enum('all_inclusive', ['yes', 'no'])->nullable();
            $table->string('airline', 35)->nullable();
            $table->string('distance_airport', 35)->nullable();
            $table->string('distance_lift', 35)->nullable();
            $table->string('distance_center', 35)->nullable();
            $table->string('distance_beach', 35)->nullable();
            $table->string('distance_nature', 35)->nullable();
            $table->string('beach_type', 35)->nullable();
            $table->enum('pets_allowed', ['yes', 'no'])->nullable();
            $table->enum('childcare', ['no', 'yes_paid', 'yes_free', 'yes'])->nullable();
            $table->enum('pool', ['yes', 'no'])->nullable();
            $table->enum('gym', ['yes', 'no'])->nullable();
            $table->string('hotel_link', 35)->nullable();
            $table->enum('visa_required', ['yes', 'no'])->nullable();

            $table->timestamps();

            $table->foreign('tour_id')->references('id')->on('tours')->onDelete('cascade');
        });

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tour_details');
    }
};
