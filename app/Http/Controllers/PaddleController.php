<?php

namespace App\Http\Controllers;

use App\Paddle;
use Illuminate\Routing\Controller as BaseController;

class PaddleController extends BaseController
{

    function index(){
        return response()->json( Paddle::getAll() );
    }
}
