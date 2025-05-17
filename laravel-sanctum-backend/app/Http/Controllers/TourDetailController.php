<?php

namespace App\Http\Controllers;

use App\Models\TourDetail;
use App\Models\Tour;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TourDetailController extends Controller
{
    public function store(Request $request, $tourId)
    {
        $tour = Tour::findOrFail($tourId);

        $validated = $request->validate([
            'room_class' => 'nullable|string|max:35',
            'age_limit' => 'nullable|string|max:35',
            'all_inclusive' => 'nullable|in:ultra_all_in,all_in,full_package,half_board,breakfast,flgt_accmd,accmd,flgt_excursion,excursion,сustom',
            'airline' => 'nullable|string|max:35',
            'distance_airport' => 'nullable|string|max:35',
            'distance_lift' => 'nullable|string|max:35',
            'distance_beach' => 'nullable|string|max:35',
            'distance_nature' => 'nullable|string|max:35',
            'distance_center' => 'nullable|string|max:35',
            'beach_type' => 'nullable|string|max:35',
            'pets_allowed' => 'nullable|in:yes,no',
            'childcare' => 'nullable|in:no,yes_paid,yes_free',
            'pool' => 'nullable|in:yes,no',
            'gym' => 'nullable|in:yes,no',
            'hotel_link' => 'nullable|string|max:35',
            'visa_required' => 'nullable|in:yes,no',
        ]);

        $tourDetail = TourDetail::create([
            'tour_id' => $tour->id,
            'room_class' => $validated['room_class'] ?? null,
            'age_limit' => $validated['age_limit'] ?? null,
            'all_inclusive' => $validated['all_inclusive'] ?? null,
            'airline' => $validated['airline'] ?? null,
            'distance_airport' => $validated['distance_airport'] ?? null,
            'distance_lift' => $validated['distance_lift'] ?? null,
            'distance_beach' => $validated['distance_beach'] ?? null,
            'distance_nature' => $validated['distance_nature'] ?? null,
            'distance_center' => $validated['distance_center'] ?? null,
            'beach_type' => $validated['beach_type'] ?? null,
            'pets_allowed' => $validated['pets_allowed'] ?? null,
            'childcare' => $validated['childcare'] ?? null,
            'pool' => $validated['pool'] ?? null,
            'gym' => $validated['gym'] ?? null,
            'hotel_link' => $validated['hotel_link'] ?? null,
            'visa_required' => $validated['visa_required'] ?? null,
        ]);

        return response()->json($tourDetail, 201);
    }

    public function update(Request $request, $tourId)
    {
        $tour = Tour::findOrFail($tourId);
        $tourDetail = $tour->detail;

        if (!$tourDetail) {
            return response()->json(['message' => 'Tour detail not found.'], 404);
        }

        $validated = $request->validate([
            'room_class' => 'nullable|string|max:35',
            'age_limit' => 'nullable|string|max:35',
            'all_inclusive' => 'nullable|in:ultra_all_in,all_in,full_package,half_board,breakfast,flgt_accmd,accmd,flgt_excursion,excursion,сustom',
            'airline' => 'nullable|string|max:35',
            'distance_airport' => 'nullable|string|max:35',
            'distance_lift' => 'nullable|string|max:35',
            'distance_beach' => 'nullable|string|max:35',
            'distance_nature' => 'nullable|string|max:35',
            'distance_center' => 'nullable|string|max:35',
            'beach_type' => 'nullable|string|max:35',
            'pets_allowed' => 'nullable|in:yes,no',
            'childcare' => 'nullable|in:no,yes_paid,yes_free',
            'pool' => 'nullable|in:yes,no',
            'gym' => 'nullable|in:yes,no',
            'hotel_link' => 'nullable|string|max:35',
            'visa_required' => 'nullable|in:yes,no',
        ]);

        foreach ($validated as $key => $value) {
            if ($value !== null) {
                $tourDetail->$key = $value;
            } else {
                $tourDetail->$key = null;
            }
        }

        $tourDetail->save();

        return response()->json($tourDetail);
    }

    public function destroy($tourId)
    {
        $tour = Tour::findOrFail($tourId);
        $tourDetail = $tour->detail;

        if (!$tourDetail) {
            return response()->json(['message' => 'Детали тура не найдены.'], 404);
        }

        $tourDetail->delete();

        return response()->json(['message' => 'Детали тура успешно удалены.']);
    }
}
