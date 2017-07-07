<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kayak extends Model
{

    public $timestamp = false;
    protected $table = 'kayak';


    protected $fillable = ['created_at', 'updated_at', 'title','photo','desc','price','order','number'];




    static function getAll(){
        return self::orderBy('order','ASC')->where('display','1')
            ->get();
    }



}
