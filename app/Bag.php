<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Bag extends Model
{

    public $timestamp = false;
    protected $table = 'bag';


    protected $fillable = ['title', 'photo', 'number', 'order' ,'desc'];


    static function getAll(){
        return self::get();
    }
}
