<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Application extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'communication_method',
        'contacts',
        'communication_time',
        'direction',
        'budget',
        'notes',
        'status',
    ];

    public function documents()
    {
        return $this->hasMany(ApplicationDocument::class);
    }

}
