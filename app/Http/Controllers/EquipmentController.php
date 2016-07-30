<?php

namespace App\Http\Controllers;

use App\Equipment;
use Illuminate\Routing\Controller as BaseController;

class EquipmentController extends BaseController
{

    function index(){
        return response()->json( Equipment::getAll() );
    }
}
