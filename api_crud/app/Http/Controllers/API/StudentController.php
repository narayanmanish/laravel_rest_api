<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\student;
use Illuminate\Support\Facades\Validator;

class StudentController extends Controller
{
    public function store(Request $request){
     $validator = Validator::make($request->all(),[
        'name' => 'required|min:3|max:191',
        'course' => 'required|max:191',
        'email' => 'required|email|max:191',
        'phone' => 'required|min:10|max:10'
     ]);
     if($validator->fails())
     {
        return response()->json([
            'status'=>422,
            'message'=>$validator->messages()
        ],422);
     }
     else{
        $student=Student::create([
            'name' => $request->name,
            'course' => $request->course,
            'email' => $request->email,
            'phone' => $request->phone
        ]);
        if($student)
        {
            return response()->json([
                'status' => 200,
                'message' => 'student Created sucessfully'
            ],200);
        }
        else{
            return response()->json([
                'status' => 500,
                'message' => 'something went worng'
            ],500);
        }
        
     }
    }
    public function index()
    {
        $students = Student::all();
        if($students->count()>0)
        {
           return response()->json([
               'status'=>200,
               'students'=>$students
           ],200);
        }
        else{
            return response()->json([
                'status' => 404,
                'students' => 'NO record Found'
            ],404);
           
        }
    }
    public function show($id)
    {
        $student = Student::find($id);
        if($student)
        {
            return response()->json([
                'status' => 200,
                'student' =>$student
            ],200);
        }
        else{
            return response()-json([
                'status' => 404,
                'message' => "No Student FOUND"
            ],404);
        }
    }
    public function edit($id)
    {
        $student = Student::find($id);
        if($student)
        {
            return response()->json([
                'status' => 200,
                'student' =>$student
            ],200);
        }
        else{
            return response()-json([
                'status' => 404,
                'message' => "No Student FOUND"
            ],404);
        }

    }
    public function update(Request $request,$id)
    {
        $validator = Validator::make($request->all(),[
            'name' => 'required|min:3|max:191',
            'course' => 'required|max:191',
            'email' => 'required|email|max:191',
            'phone' => 'required|min:10|max:10'
         ]);
         if($validator->fails())
         {
            return response()->json([
                'status'=>422,
                'message'=>$validator->messages()
            ],422);
         }
         else{
            $student=Student::find($id);
           
            if($student)
            {
                $student->update([
                    'name' => $request->name,
                    'course' => $request->course,
                    'email' => $request->email,
                    'phone' => $request->phone
                ]);
                return response()->json([
                    'status' => 200,
                    'message' => 'student Updated sucessfully'
                ],200);
            }
            else{
                return response()->json([
                    'status' => 404,
                    'message' => 'no student found'
                ],404);
            }
            
         }
    }
    public function destroy($id)
    {
        $student = Student::find($id);
        if($student)
        {
            $student->delete();
            
            return response()->json([
                'status' => 200,
                'message' => 'Student Deleted successfully'
            ],200);
        }
        else
        {
            return response()->json([
                'status' => 500,
                'message' => 'no student found'
            ],500);
        }

    }
}
