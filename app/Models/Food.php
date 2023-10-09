<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Food extends Model
{
    use HasFactory;

    protected $table = 'foods';
    
    protected $fillable = [
        'food_name',
        'food_image',
        'food_type',
        'description',
        'cost',
    ];
}
