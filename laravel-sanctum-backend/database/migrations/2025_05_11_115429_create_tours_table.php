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
        Schema::create('tours', function (Blueprint $table) {
            $table->unsignedInteger('id')->autoIncrement();
            $table->unsignedInteger('tour_package_id');
            $table->string('hotel_name', 35);
            $table->string('hotel_image')->nullable();
            $table->string('departure_city', 25);
            $table->string('arrival_city', 25);
            $table->date('start_date');
            $table->unsignedInteger('nights');
            $table->decimal('price', 10, 2);
            $table->enum('price_type', ['per_person', 'per_couple']);
            $table->date('end_date');
            $table->enum('status', ['active', 'expired']);
            $table->string('image_text_copyright', 40)->nullable();
            $table->string('image_link_copyright')->nullable();
            $table->timestamps();

            $table->foreign('tour_package_id')
                ->references('id')
                ->on('tour_packages')
                ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('tours');
    }
};
