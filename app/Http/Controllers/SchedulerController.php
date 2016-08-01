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

    function store( Request $request ){
        $all = $request->all();
        $flight = Scheduler::create($all);
        $flight->Kayak()->sync($all['kayak']);
        if ( isset($all['equipment']) ){
            $flight->Equipment()->sync($all['equipment']);
        }
        return response()->json($flight->toArray(), 200, [], JSON_NUMERIC_CHECK );
    }

    function updateStatus($id,  Request $request){
        $order = Scheduler::find($id)->update(['status'=>$request->get('status')]);
        return response()->json(['success'=>true], 200, [], JSON_NUMERIC_CHECK );
    }
    function updateNote($id,  Request $request){
        $order = Scheduler::find($id)->update(['note'=>$request->get('note')]);
        return response()->json(['success'=>true], 200, [], JSON_NUMERIC_CHECK );
    }
}
