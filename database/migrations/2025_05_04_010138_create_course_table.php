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
        Schema::create('course', function (Blueprint $table) {
            $table->id();
            $table->string("course_name");
            $table->timestamps();
        });
        DB::table("course")->insert([
            ["course_name" => "Bachelor of Science in Infromation Technology"],
            ["course_name" => "Bachelor of Science in Business Administration"],
            ["course_name" => "Bachelor of Science in Teacher Education"],
        ],
        
    );

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('course');
    }
};
