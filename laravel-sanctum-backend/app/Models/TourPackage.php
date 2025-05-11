<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourPackage extends Model
{
    use HasFactory;

    use HasFactory;

    protected $fillable = [
        'title',
        'departure_city',
        'arrival_city',
        'description',
        'main_image',
        'main_image_thumbnail',
    ];

    protected $casts = [
        'description' => 'array',
    ];

    public function tours()
    {
        return $this->hasMany(Tour::class);
    }

    public function images()
    {
        return $this->hasMany(TourPackageImage::class);
    }
}
