<?php

namespace App\Http\Controllers;

use App\Kayak;
use Illuminate\Routing\Controller as BaseController;

class KayakController extends BaseController
{

    function index(){
        return response()->json( Kayak::getAll() );
    }
}
