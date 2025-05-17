<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Models\TourDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TourController extends Controller
{
    public function index()
    {
        \App\Models\Tour::where('status', 'active')
            ->where('end_date', '<', now())
            ->update(['status' => 'expired']);
        
        $tours = \App\Models\Tour::with('details')->latest()->get();
        return response()->json($tours);
    }
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tour_package_id' => 'required|exists:tour_packages,id',
            'hotel_name' => 'required|string|max:35',
            'hotel_image' => 'nullable|string',
            'departure_city' => 'required|string|max:25',
            'arrival_city' => 'required|string|max:25',
            'arrival_country' => 'nullable|string|max:50',
            'start_date' => 'required|date',
            'nights' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'price_type' => 'required|in:per_person,per_couple',
            'end_date' => 'required|date|after_or_equal:start_date',
            'status' => 'required|in:active,expired',
            'details' => 'nullable|array',
            'image_text_copyright' => 'nullable|string|max:40',
            'image_link_copyright' => 'nullable|string|max:255',
            'tour_category' => 'required|string|max:25',
            'article_number' => 'nullable|string|max:25',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tourData = $request->only([
            'tour_package_id',
            'hotel_name',
            'hotel_image',
            'departure_city',
            'arrival_city',
            'arrival_country',
            'start_date',
            'nights',
            'price',
            'price_type',
            'end_date',
            'status',
            'image_text_copyright',
            'image_link_copyright',
        ]);

        $tour = Tour::create($tourData);

        if ($request->has('details')) {
            $detailsData = $request->input('details');
            $detailsData['tour_id'] = $tour->id;
            TourDetail::create($detailsData);
        }

        return response()->json($tour->load('details'), 201);
    }

    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'hotel_name' => 'sometimes|required|string|max:35',
            'hotel_image' => 'nullable|string',
            'departure_city' => 'sometimes|required|string|max:25',
            'arrival_city' => 'sometimes|required|string|max:25',
            'arrival_country' => 'nullable|string|max:50',
            'start_date' => 'sometimes|required|date',
            'nights' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0',
            'price_type' => 'sometimes|required|in:per_person,per_couple',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'status' => 'sometimes|required|in:active,expired',
            'details' => 'nullable|array',
            'image_text_copyright' => 'nullable|string|max:40',
            'image_link_copyright' => 'nullable|string|max:255',
            'tour_category' => 'required|string|max:25',
            'article_number' => 'nullable|string|max:25',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tour->update($request->only([
            'hotel_name',
            'hotel_image',
            'departure_city',
            'arrival_city',
            'arrival_country',
            'start_date',
            'nights',
            'price',
            'price_type',
            'end_date',
            'status',
            'image_text_copyright',
            'image_link_copyright',
        ]));

        if ($request->has('details')) {
            $detailsData = $request->input('details');
            if ($tour->details) {
                $tour->details->update($detailsData);
            } else {
                $detailsData['tour_id'] = $tour->id;
                TourDetail::create($detailsData);
            }
        }

        return response()->json($tour->load('details'));
    }

    public function destroy($id)
    {
        $tour = Tour::findOrFail($id);
        $tour->delete();

        return response()->json(['message' => 'Тур успешно удален.']);
    }

    public function clone($id)
    {
        $tour = Tour::with('details')->findOrFail($id);

        $newTour = $tour->replicate();
        $newTour->status = 'active';
        $newTour->save();

        if ($tour->details) {
            $newDetails = $tour->details->replicate();
            $newDetails->tour_id = $newTour->id;
            $newDetails->save();
        }

        return response()->json($newTour->load('details'), 201);
    }
}
