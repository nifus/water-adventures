<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Paddle extends Model
{

    public $timestamp = false;
    protected $table = 'paddle';


    protected $fillable = ['title','number','order','desc'];


    static function getAll(){
        return self::get();
    }
}
