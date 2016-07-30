<?php

//Route::post('scheduler', 'SchedulerController@Index');




Route::group(['prefix' => 'backend'], function () {
    Route::resource('kayak', 'KayakController');
    Route::resource('equipment', 'EquipmentController');
    Route::resource('scheduler', 'SchedulerController');
});
