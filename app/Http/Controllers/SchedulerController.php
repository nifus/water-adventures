<?php
namespace App\Http\Controllers;
use App\Scheduler;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class SchedulerController extends BaseController
{


    function index(){


        $rows = Scheduler::with('Kayak')->orderBy('begin_rent','ASC');
        return response()->json($rows->get()->toArray());
    }
}
