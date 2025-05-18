<?php

use App\Http\Controllers\ApplicationController;
use App\Http\Controllers\ApplicationDocumentController;
use App\Http\Controllers\ArticleController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CertificateController;
use App\Http\Controllers\ImageController;
use App\Http\Controllers\InfoSheetController;
use App\Http\Controllers\PartnerController;
use App\Http\Controllers\PostsController;
use App\Http\Controllers\TourController;
use App\Http\Controllers\TourDetailController;
use App\Http\Controllers\TourPackageController;
use App\Http\Controllers\TourPackageImageController;
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
Route::middleware('auth:sanctum')->post('/logout', [AuthController::class, 'logout']);

Route::middleware('auth:sanctum')->post('/user', [AuthController::class, 'createUser']);
Route::get('/users', [AuthController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/users/{id}', [AuthController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::middleware('auth:sanctum')->post('/upload-image', [ImageController::class, 'uploadByFile']);

Route::middleware('auth:sanctum')->post('/info-sheets', [InfoSheetController::class, 'store']);
Route::get('/info-sheets', [InfoSheetController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/info-sheets/{id}', [InfoSheetController::class, 'destroy']);
Route::middleware('auth:sanctum')->put('/info-sheets/{id}', [InfoSheetController::class, 'update']);

Route::middleware('auth:sanctum')->get('/articles', [ArticleController::class, 'index']);
Route::middleware('auth:sanctum')->post('/articles', [ArticleController::class, 'store']);
Route::middleware('auth:sanctum')->match(['post', 'put'], '/articles/{id}', [ArticleController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/articles/{id}', [ArticleController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/articles/{id}', [ArticleController::class, 'show']);

Route::get('/certificates', [CertificateController::class, 'index']);
Route::middleware('auth:sanctum')->post('/certificates', [CertificateController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/certificates/{id}', [CertificateController::class, 'destroy']);
Route::middleware('auth:sanctum')->match(['post', 'put'], '/certificates/{id}', [CertificateController::class, 'update']);

Route::post('/applications', [ApplicationController::class, 'store']);
Route::middleware('auth:sanctum')->get('/applications', [ApplicationController::class, 'index']);
Route::middleware('auth:sanctum')->delete('/applications/{id}', [ApplicationController::class, 'destroy']);
Route::middleware('auth:sanctum')->put('/applications/{id}/status', [ApplicationController::class, 'updateStatus']);
Route::middleware('auth:sanctum')->post('/applications/{id}/document', [ApplicationController::class, 'uploadDocument']);
Route::middleware('auth:sanctum')->get('/applications/{id}', [ApplicationController::class, 'show']);

Route::middleware('auth:sanctum')->group(function () {
    Route::get('/tour-packages', [TourPackageController::class, 'index']);
    Route::post('/tour-packages', [TourPackageController::class, 'store']);
    Route::get('/tour-packages/{id}', [TourPackageController::class, 'show']);
    Route::match(['post', 'put'], '/tour-packages/{id}', [TourPackageController::class, 'update']);
    Route::delete('/tour-packages/{id}', [TourPackageController::class, 'destroy']);

    Route::post('/tour-packages/{tourPackageId}/images', [TourPackageImageController::class, 'store']);
    Route::get('/tour-packages/{tourPackageId}/images', [TourPackageImageController::class, 'index']);
    Route::delete('/tour-packages/images/{id}', [TourPackageImageController::class, 'destroy']);

    Route::post('/tours', [TourController::class, 'store']);
    Route::put('/tours/{id}', [TourController::class, 'update']);
    Route::delete('/tours/{id}', [TourController::class, 'destroy']);
    Route::post('/tours/{id}/clone', [TourController::class, 'clone']);
    Route::get('/tours', [TourController::class, 'index']);

    Route::post('/tours/{tourId}/details', [TourDetailController::class, 'store']);
    Route::put('/tours/{tourId}/details', [TourDetailController::class, 'update']);
    Route::delete('/tours/{tourId}/details', [TourDetailController::class, 'destroy']);
});

Route::get('/posts-content', [PostsController::class, 'index']);

Route::middleware('auth:sanctum')->get('/partners', [PartnerController::class, 'index']);
Route::middleware('auth:sanctum')->post('/partners', [PartnerController::class, 'store']);
Route::middleware('auth:sanctum')->put('/partners/{id}', [PartnerController::class, 'update']);
Route::middleware('auth:sanctum')->delete('/partners/{id}', [PartnerController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/partners/{id}', [PartnerController::class, 'show']);

Route::middleware('auth:sanctum')->post('/applications/{id}/document', [ApplicationDocumentController::class, 'store']);
Route::middleware('auth:sanctum')->delete('/application-document/{id}', [ApplicationDocumentController::class, 'destroy']);
Route::middleware('auth:sanctum')->get('/applications/{id}/documents', [ApplicationDocumentController::class, 'index']);

