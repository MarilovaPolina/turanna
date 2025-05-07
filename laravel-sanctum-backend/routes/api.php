<?php

use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InfoSheetController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::middleware('auth:sanctum')->post('/user', [AuthController::class, 'createUser']);
Route::get('/users', [AuthController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/users/{id}', [AuthController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/upload-image', [ImageController::class, 'uploadByFile']);

Route::middleware('auth:sanctum')->post('/info-sheets', [InfoSheetController::class, 'store']);
Route::middleware('auth:sanctum')->get('/info-sheets', [InfoSheetController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/info-sheets/{id}', [InfoSheetController::class, 'destroy']);
Route::middleware('auth:sanctum')->put('/info-sheets/{id}', [InfoSheetController::class, 'update']);

Route::middleware('auth:sanctum')->get('/articles', [ArticleController::class, 'index']);
Route::middleware('auth:sanctum')->post('/articles', [ArticleController::class, 'store']);
Route::middleware('auth:sanctum')->put('/articles/{id}', [ArticleController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/articles/{id}', [ArticleController::class, 'destroy']);

