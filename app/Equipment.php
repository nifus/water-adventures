<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Equipment extends Model
{


    protected $table = 'equipment';


    protected $fillable = ['created_at', 'updated_at', 'title','photo','desc','price','number','isFixedPrice','order'];

   
}
