<?php


Route::get('/arenda-baidarok-na-belom-more.html', function () {
    return view('arenda-baidarok-na-belom-more');
});
Route::get('/', function () {
    return view('index');
});
Route::get('/reservation.html', function () {
    return view('reservation');
});
Route::get('/maps.html', function () {
    return view('maps');
});

Route::get('/prices.html', function () {
    return view('prices');
});


Route::get('/conditions.html', function () {
    return view('conditions');
});
Route::get('/arenda-baidarok-na-ladoge.html', function () {
    return view('arenda-baidarok-na-ladoge');
});
Route::get('/arenda-baidarok-na-vuokse.html', function () {
    return view('arenda-baidarok-na-vuokse');
});Route::get('/nachinaushim.html', function () {
    return view('nachinaushim');
});