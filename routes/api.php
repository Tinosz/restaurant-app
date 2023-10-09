<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\FoodController;
use Illuminate\Http\Request;
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

Route::middleware('auth:sanctum')->group(function() {
    Route::get('/user', function (Request $request) {
        return $request->user();
});
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/admin/user', [AuthController::class, 'getAdminUserData']);
});
Route::apiResource('/foods', FoodController::class);
Route::get('/foods', [FoodController::class, 'index']);
Route::post('/signup', [AuthController::class, 'signup']);
Route::post('/login', [AuthController::class, 'login']);
Route::post('/adminlogin', [AuthController::class, 'adminlogin']);
