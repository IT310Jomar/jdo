<?php

use Inertia\Inertia;
use App\Http\Middleware\CheckRole;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

//middleware for auth
Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
   
    Route::get('/login', function () {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
    
        return Inertia::render('auth/login');
    })->name('login');
  
    Route::get('/', function () {
        if (Auth::check()) {
            return redirect()->route('dashboard');
        }
    
        return redirect()->route('auth/login'); 
    })->name('home');
    

});

//middleware for admin
Route::middleware(['auth', CheckRole::class . ':admin','verified'])->group(function () {
    Route::get('/admin/students', function () {
        return Inertia::render('admin/students');
    })->name('admin.students');

});

//middleware for my instructor
Route::middleware(['auth', CheckRole::class . ':instructor','verified'])->group(function () {
  


});



require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
