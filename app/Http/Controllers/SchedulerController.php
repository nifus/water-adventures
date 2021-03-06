<?php
namespace App\Http\Controllers;
use App\Scheduler;
use Illuminate\Routing\Controller as BaseController;
use Illuminate\Http\Request;

class SchedulerController extends BaseController
{

    function getStat(){

        $orders = Scheduler::with('Kayak')->get();
        return response()->json($orders->toArray());

    }

    function getById($id){
        $order = Scheduler::with('Kayak')->with('Bag')->with('Paddle')->with('Equipment')->find($id);
        return response()->json($order->toArray());
    }

    function index(){
        $rows = Scheduler::with('Kayak')->with('Bag')->with('Paddle')->with('Equipment')->orderBy('begin_rent','ASC');
        return response()->json($rows->get()->toArray());
    }

    function store( Request $request ){
        $all = $request->all();
        $flight = Scheduler::create($all);
        $flight->Kayak()->sync($all['kayak']);
        if ( isset($all['equipment']) ){
            $flight->Equipment()->sync($all['equipment']);
        }
        if ( isset($all['paddle']) ){
            $flight->Paddle()->sync($all['paddle']);
        }
        if ( isset($all['bag']) ){
            $flight->Bag()->sync($all['bag']);
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
    function update($id,  Request $request){
        $all = $request->all();
        $order = Scheduler::find($id);

        $order->update($all);
        $order->Kayak()->sync($all['kayak']);
        $order->Paddle()->sync($all['paddle']);
        return response()->json(['success'=>true], 200, [], JSON_NUMERIC_CHECK );
    }
}
