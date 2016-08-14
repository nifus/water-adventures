<?php

Route::get('pdf/{id}', function($id){
    $order = App\Scheduler::find($id);

    $pdf = \PDF::loadView('dogovor', ['order'=>$order]);
    return $pdf->setPaper('a4')->stream();;


});


Route::group(['prefix' => 'backend'], function () {
    Route::resource('kayak', 'KayakController');
    Route::resource('equipment', 'EquipmentController');
    //Route::resource('scheduler', 'SchedulerController');
    Route::put('scheduler/{id}/status', 'SchedulerController@updateStatus');
    Route::put('scheduler/{id}/note', 'SchedulerController@updateNote');
    Route::put('scheduler/{id}', 'SchedulerController@update');
    Route::get('scheduler/{id}', 'SchedulerController@getById');
    Route::post('scheduler/{id}', 'SchedulerController@store');
    Route::get('scheduler', 'SchedulerController@index');

    Route::get('bag', 'BagController@index');
    Route::get('paddle', 'PaddleController@index');

});
