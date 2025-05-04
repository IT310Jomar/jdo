<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('class', function (Blueprint $table) {
            $table->id();
            $table->string('class_name',50);
            $table->unsignedBigInteger('stud_id');
            $table->unsignedBigInteger('ins_id');
            $table->unsignedBigInteger('dept_id');
            $table->unsignedBigInteger('section_id');
            $table->unsignedBigInteger('subject_id');
            $table->boolean('archive')->default(0);
            $table->timestamps();

            $table->foreign('stud_id')->references('id')->on('students')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('ins_id')->references('id')->on('instructor')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('dept_id')->references('id')->on('departments')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('section_id')->references('id')->on('section')->onDelete('cascade')->onUpdate('cascade');
            $table->foreign('subject_id')->references('id')->on('subjects')->onDelete('cascade')->onUpdate('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('class');
    }
};
