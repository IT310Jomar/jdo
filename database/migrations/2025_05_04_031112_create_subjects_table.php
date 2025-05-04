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
        Schema::create('subjects', function (Blueprint $table) {
            $table->id();
            $table->string('sub_name');
            $table->string('sub_code')->nullable();
            $table->string('schedule',50);
            $table->timestamps();
        });
        DB::table("subjects")->insert([
            [
                "sub_name" => "Web Development",
                "sub_code" => "IT208",
                "schedule" => "Monday-Friday (7:30 A.M - 1:30 P.M)"
            ],
            [
                "sub_name" => "System Integration and Architecture 2",
                "sub_code" => "IT310",
                "schedule" => "Monday-Tuesday (2:30 P.M - 7:30 P.M)"
            ],
        ],
        
    );
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('subjects');
    }
};
