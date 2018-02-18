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
Route::get('/delivery.html', function () {
    return view('delivery');
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
});
Route::get('/nachinaushim.html', function () {
    return view('nachinaushim');
});

Route::get('/kayaks/ladoga2.html', function () {
    return view('kayaks.ladoga2');
});
Route::get('/kayaks/viking.html', function () {
    return view('kayaks.viking');
});

Route::get('/kayaks/vektor2.html', function () {
    return view('kayaks.vektor2');
});
Route::get('/kayaks/neva.html', function () {
    return view('kayaks.neva');
});