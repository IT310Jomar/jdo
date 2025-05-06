<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Validation\ValidationException;

use function PHPSTORM_META\map;

class StudentController extends Controller
{
    public function getStudents()
    {
        $students = Student::latest()->paginate(500); 
    
        return response()->json([
            "success" => true,
            "data" => $students
        ], 200);
    }//public function getStudents()

    public function addStudents(){
        try {
            $validated = request()->validate([
                "studFname" => 'required|string|max:50',
                "studMname" => 'nullable|string|max:50',
                "studLname" => 'required|string|max:50',
                "studEmail" => 'required|email|unique:students,email'
            ]);
        
            // check composite uniqueness
            $exists = Student::where('stud_fname', $validated['studFname'])
                ->where('stud_mname', $validated['studMname'] ?? '')
                ->where('stud_lname', $validated['studLname'])
                ->exists();
        
            if ($exists) {
                return response()->json([
                    'success' => false,
                    'message' => 'Student is already added'
                ], 422);
            }
        
            Student::create([
                "stud_fname" => $validated['studFname'],
                "stud_mname" => $validated['studMname'],
                "stud_lname" => $validated['studLname'],
                "email"      => $validated['studEmail'],
            ]);
        
            return response()->json(["success" => true, "message" => "Added Successfully"], 200);
        
        } catch (ValidationException $e) {
            return response()->json([
                'success' => false,
                'message' => 'Validation failed',
                'errors'  => $e->errors()
            ], 422);
        }
        
    }// public function addStudents()

    public function updateStudent(){

        return response()->json(["success" => true, "id" => request("stud_id")],200);

    }
    


}
