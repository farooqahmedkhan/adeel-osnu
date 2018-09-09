<?php

use Illuminate\Http\Request;

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

Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::resource('applications', 'AppController');
Route::resource('templates', 'TemplateController');
Route::resource('notifications', 'NotificationController');

Route::post('/send_notification', 'NotificationController@send');
Route::put('applications/{id}/state/{state}', 'AppController@updateApplicationState');
