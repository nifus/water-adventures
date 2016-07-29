<?php

Route::post('scheduler', 'SchedulerController@Index');




Route::group(['prefix' => 'backend'], function () {
    Route::resource('kayak', 'KayakController');
    Route::get('scheduler', 'SchedulerController@index');
});
