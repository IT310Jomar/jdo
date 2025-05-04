<?php

use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Database\Migrations\Migration;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('specialization', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->string('spl_name');
            $table->timestamps();
            
            $table->foreign('course_id')->references('id')->on('course')->onDelete('cascade')->onUpdate('cascade');
           
        
        
        });
        DB::table("specialization")->insert([
            [
                "course_id" => 1, 
                "spl_name"  => "Web Development"
            ],
            [
                "course_id" => 2,
                "spl_name"  => "Financial Management" 
            ],
            [
                "course_id" => 2, 
                "spl_name"  => "Marketing Management" 
            ],
            [
                "course_id" => 3, 
                "spl_name"  => "Bachelor of Elementary Education (BEEd)"
            ],
            [
                "course_id" => 3, 
                "spl_name"  => "Bachelor of Secondary Education (BSEd)"
            ]
        ]);
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('specialization');
    }
};
