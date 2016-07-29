<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Kayak extends Model
{


    protected $table = 'kayak';


    protected $fillable = ['created_at', 'updated_at', 'title','photo','desc','price','order','number'];




    static function getAll(){
        return self::orderBy('order','ASC')
            ->get();
    }



}
