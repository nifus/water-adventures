<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Scheduler extends Model
{


    protected $table = 'scheduler';


    protected $fillable = ['created_at', 'updated_at', 'begin_rent','end_rent','phone','name','time','price','confirmed'];

    public function Kayak()
    {
       return $this->belongsToMany('App\Kayak','scheduler_kayak');
    }
}
