<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tour extends Model
{
    use HasFactory;

    protected $fillable = [
        'tour_package_id',
        'hotel_name',
        'hotel_image',
        'departure_city',
        'arrival_city',
        'start_date',
        'nights',
        'price',
        'price_type',
        'end_date',
        'status',
        'image_text_copyright',
        'image_link_copyright',
        'tour_category',
        'article_number',
    ];

    protected $casts = [
        'start_date' => 'date',
        'end_date' => 'date',
        'price' => 'decimal:2',
    ];

    public function tourPackage()
    {
        return $this->belongsTo(TourPackage::class);
    }

    public function details()
    {
        return $this->hasOne(TourDetail::class);
    }
}
