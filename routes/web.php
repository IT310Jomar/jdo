<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('auth/login');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard');
    })->name('dashboard');
    // routes/web.php
    Route::get('/admin/students', function () {
        return Inertia::render('admin/students');
    })->name('admin.students');

});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
