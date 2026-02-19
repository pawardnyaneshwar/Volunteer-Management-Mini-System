<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\VolunteerController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/me', [AuthController::class, 'profile']);

    Route::get('/volunteers/stats', [VolunteerController::class, 'stats']);
    Route::apiResource('volunteers', VolunteerController::class);
    Route::post('/volunteers/{id}/toggle-status', [VolunteerController::class, 'toggleStatus']);
});
