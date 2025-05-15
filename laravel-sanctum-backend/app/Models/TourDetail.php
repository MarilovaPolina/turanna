<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class TourDetail extends Model
{
    use HasFactory;
    protected $fillable = [
        'tour_id',
        'room_class',
        'age_limit',
        'all_inclusive',
        'airline',
        'distance_airport',
        'distance_lift',
        'distance_center',
        'distance_beach',
        'distance_nature',
        'beach_type',
        'pets_allowed',
        'childcare',
        'pool',
        'gym',
        'hotel_link',
        'visa_required',
    ];

    public function tour()
    {
        return $this->belongsTo(Tour::class);
    }
}
