<?php

use App\Http\Controllers\StudentController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');


Route::group(['middleware'=>'api','prefix'=>'admin'],function(){
  Route::get('/fetch-students',[StudentController::class,'getStudents']);
});