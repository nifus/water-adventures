<?php

namespace App\Http\Controllers;

use App\Bag;
use Illuminate\Routing\Controller as BaseController;

class BagController extends BaseController
{

    function index(){
        return response()->json( Bag::getAll() );
    }
}
