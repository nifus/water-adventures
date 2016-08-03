<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Scheduler extends Model
{


    protected $table = 'scheduler';


    protected $fillable = ['created_at', 'updated_at', 'begin_rent', 'end_rent', 'phone', 'name', 'time', 'price', 'confirmed', 'note', 'pledge', 'old_client', 'status', 'number_of_positions','place_of_return','city_of_return','place_of_renting','city_of_renting','passport','passport_name'];

    public function Kayak()
    {
        return $this->belongsToMany('App\Kayak', 'scheduler_kayak');
    }

    public function Equipment()
    {
        return $this->belongsToMany('App\Equipment', 'scheduler_equipment');
    }

    public function Bag()
    {
        return $this->belongsToMany('App\Bag', 'scheduler_bag');
    }

    public function Paddle()
    {
        return $this->belongsToMany('App\Paddle', 'scheduler_paddle');
    }

    public function getBeginRentDayAttribute()
    {
        $date = new \DateTime($this->begin_rent);
        return $date->format('d');
    }

    public function getBeginRentDateAttribute()
    {
        $date = new \DateTime($this->begin_rent);
        return str_replace(array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'), array('Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'), $date->format('d F Y'));
    }
    public function getEndRentDateAttribute()
    {
        $date = new \DateTime($this->end_rent);
        return str_replace(array('January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'), array('Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'), $date->format('d F Y'));
    }

    public function getNumberOfPositionsTextAttribute()
    {
        if ($this->number_of_positions == 1) {
            return 'место';
        } elseif ($this->number_of_positions > 1 && $this->number_of_positions < 5) {
            return 'места';
        } elseif ($this->number_of_positions > 4) {
            return 'мест';
        }

    }

    public function getStringPriceAttribute(){
        return $this->num2str($this->price);
    }

    public function getStringPledgeAttribute(){
        return $this->num2str($this->pledge);
    }

    public function getPaddlesByGroupAttribute(){
        $result = [];
        $paddles = $this->Paddle();
        if ( sizeof($paddles)==0 ){
            return 0;
        }
        foreach( $paddles as $paddle ){
            
        }

    }


    private function num2str($num)
    {
        $nul = 'ноль';
        $ten = array(
            array('', 'один', 'два', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'),
            array('', 'одна', 'две', 'три', 'четыре', 'пять', 'шесть', 'семь', 'восемь', 'девять'),
        );
        $a20 = array('десять', 'одиннадцать', 'двенадцать', 'тринадцать', 'четырнадцать', 'пятнадцать', 'шестнадцать', 'семнадцать', 'восемнадцать', 'девятнадцать');
        $tens = array(2 => 'двадцать', 'тридцать', 'сорок', 'пятьдесят', 'шестьдесят', 'семьдесят', 'восемьдесят', 'девяносто');
        $hundred = array('', 'сто', 'двести', 'триста', 'четыреста', 'пятьсот', 'шестьсот', 'семьсот', 'восемьсот', 'девятьсот');
        $unit = array( // Units
            array('копейка', 'копейки', 'копеек', 1),
            array('рубль', 'рубля', 'рублей', 0),
            array('тысяча', 'тысячи', 'тысяч', 1),
            array('миллион', 'миллиона', 'миллионов', 0),
            array('миллиард', 'милиарда', 'миллиардов', 0),
        );
        //
        list($rub, $kop) = explode('.', sprintf("%015.2f", floatval($num)));
        $out = array();
        if (intval($rub) > 0) {
            foreach (str_split($rub, 3) as $uk => $v) { // by 3 symbols
                if (!intval($v)) continue;
                $uk = sizeof($unit) - $uk - 1; // unit key
                $gender = $unit[$uk][3];
                list($i1, $i2, $i3) = array_map('intval', str_split($v, 1));
                // mega-logic
                $out[] = $hundred[$i1]; # 1xx-9xx
                if ($i2 > 1) $out[] = $tens[$i2] . ' ' . $ten[$gender][$i3]; # 20-99
                else $out[] = $i2 > 0 ? $a20[$i3] : $ten[$gender][$i3]; # 10-19 | 1-9
                // units without rub & kop
                if ($uk > 1) $out[] = $this->morph($v, $unit[$uk][0], $unit[$uk][1], $unit[$uk][2]);
            } //foreach
        } else $out[] = $nul;
        $out[] = $this->morph(intval($rub), $unit[1][0], $unit[1][1], $unit[1][2]); // rub
        $out[] = $kop . ' ' . $this->morph($kop, $unit[0][0], $unit[0][1], $unit[0][2]); // kop
        return trim(preg_replace('/ {2,}/', ' ', join(' ', $out)));
    }

    /**
     * Склоняем словоформу
     * @ author runcore
     */
    private function morph($n, $f1, $f2, $f5)
    {
        $n = abs(intval($n)) % 100;
        if ($n > 10 && $n < 20) return $f5;
        $n = $n % 10;
        if ($n > 1 && $n < 5) return $f2;
        if ($n == 1) return $f1;
        return $f5;
    }

}
