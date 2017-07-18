<?php
use Kunnu\Dropbox\Dropbox;
use Kunnu\Dropbox\DropboxApp;


Route::get('phones', function(){
    $orders = App\Scheduler::get();
    foreach($orders as $order ){

        $phone = $order->phone;
        $phone = preg_replace('#[^0-9]#','', $phone);
        if ( empty($phone)){
            continue;
        }
        if ( strlen($phone)==10 && $phone[0]==9){
            $phone = '7'.$phone;
        }
        if ( $phone[0]==8 ){
            $phone = preg_replace('#^8#','7', $phone);
        }

        $order->update(['phone'=>$phone]);
        echo $phone.'<br>';
    }



});
Route::get('test', function(){


    $app = new DropboxApp("m7zs5xatxr2joth", "0vrmt0tkkxse6uv",'IuwiDhk_e4AAAAAAAAAJrrp7H2PJ04QqjyVwOCzhQHvsFDLkG6h-Ur9nKtWTA115');

    $dropbox = new Dropbox($app);
    $listFolderContents = $dropbox->listFolder("/");
    $items = $listFolderContents->getItems();
    $files  = $items->all();
    foreach($files as $file){
        var_dump($file->getName());
        var_dump($file->getPathLower());
        $temporaryLink = $dropbox->getTemporaryLink( $file->getPathLower() );

        var_dump( $temporaryLink->getLink());

    }

});

Route::get('pdf/{id}', function($id){
    $order = App\Scheduler::find($id);

    $pdf = \PDF::loadView('dogovor', ['order'=>$order]);
    return $pdf->setPaper('a4')->stream();;


});


Route::group(['prefix' => 'backend'], function () {
    Route::resource('kayak', 'KayakController');
    Route::resource('equipment', 'EquipmentController');
    //Route::resource('scheduler', 'SchedulerController');
    Route::get('scheduler/stat', 'SchedulerController@getStat');

    Route::put('scheduler/{id}/status', 'SchedulerController@updateStatus');
    Route::put('scheduler/{id}/note', 'SchedulerController@updateNote');
    Route::put('scheduler/{id}', 'SchedulerController@update');
    Route::get('scheduler/{id}', 'SchedulerController@getById');
    Route::post('scheduler', 'SchedulerController@store');
    Route::get('scheduler', 'SchedulerController@index');

    Route::get('bag', 'BagController@index');
    Route::get('paddle', 'PaddleController@index');

});
