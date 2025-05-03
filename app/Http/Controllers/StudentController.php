<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function getStudents(){
        $students = Student::latest()->get();

        return response()->json(["success" => true,"data" => $students],200);
    }


}
