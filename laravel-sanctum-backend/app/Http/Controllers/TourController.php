<?php

namespace App\Http\Controllers;

use App\Models\Tour;
use App\Models\TourDetail;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TourController extends Controller
{
    // Создание нового тура
    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'tour_package_id' => 'required|exists:tour_packages,id',
            'hotel_name' => 'required|string|max:35',
            'hotel_image' => 'nullable|string',
            'departure_city' => 'required|string|max:25',
            'arrival_city' => 'required|string|max:25',
            'start_date' => 'required|date',
            'nights' => 'required|integer|min:1',
            'price' => 'required|numeric|min:0',
            'price_type' => 'required|in:per_person,per_couple',
            'end_date' => 'required|date|after_or_equal:start_date',
            'details' => 'nullable|array',
            'image_text_copyright' => 'nullable|string|max:40',
            'image_link_copyright' => 'nullable|string|max:255',
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
            'start_date',
            'nights',
            'price',
            'price_type',
            'end_date',
            'image_text_copyright',
            'image_link_copyright',
        ]);
        
        $tourData['status'] = 'active';

        $tour = Tour::create($tourData);

        if ($request->has('details')) {
            foreach ($request->input('details') as $detail) {
                $detail['tour_id'] = $tour->id;
                TourDetail::create($detail);
            }
        }

        return response()->json($tour->load('details'), 201);
    }

    // Обновление существующего тура
    public function update(Request $request, $id)
    {
        $tour = Tour::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'hotel_name' => 'sometimes|required|string|max:35',
            'hotel_image' => 'nullable|string',
            'departure_city' => 'sometimes|required|string|max:25',
            'arrival_city' => 'sometimes|required|string|max:25',
            'start_date' => 'sometimes|required|date',
            'nights' => 'sometimes|required|integer|min:1',
            'price' => 'sometimes|required|numeric|min:0',
            'price_type' => 'sometimes|required|in:per_person,per_couple',
            'end_date' => 'sometimes|required|date|after_or_equal:start_date',
            'status' => 'sometimes|required|in:active,expired',
            'details' => 'nullable|array',
            'image_text_copyright' => 'nullable|string|max:40',
            'image_link_copyright' => 'nullable|string|max:255',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $tour->update($request->only([
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

    // Удаление тура
    public function destroy($id)
    {
        $tour = Tour::findOrFail($id);
        $tour->delete();

        return response()->json(['message' => 'Тур успешно удален.']);
    }

    // Клонирование тура вместе с его деталями
    public function clone($id)
    {
        $tour = Tour::with('details')->findOrFail($id);

        // Клонирование тура
        $newTour = $tour->replicate();
        $newTour->status = 'active';
        $newTour->save();

        // Клонирование деталей тура, если они существуют
        if ($tour->details) {
            $newDetails = $tour->details->replicate();
            $newDetails->tour_id = $newTour->id;
            $newDetails->save();
        }

        return response()->json($newTour->load('details'), 201);
    }
}
