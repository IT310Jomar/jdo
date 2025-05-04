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
        Schema::create('departments', function (Blueprint $table) {
            $table->id();
            $table->string('dept_name',100);
            $table->timestamps();
        });

        DB::table("departments")->insert([
            ["dept_name" => "College of Infromation Technology"],
            ["dept_name" => "College of Business Administration"],
            ["dept_name" => "College of Teacher Education"],
        ],
        
    );

        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('departments');
    }
};
