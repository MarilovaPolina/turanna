<?php

namespace App\Http\Controllers;
use Illuminate\Support\Facades\Log;

use App\Models\TourPackage;
use App\Models\Tour;
use App\Models\TourDetail;
use App\Models\TourPackageImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;
use Illuminate\Support\Facades\DB;

class TourPackageController extends Controller
{
    public function index()
    {
        $tourPackages = TourPackage::with([
            'images',
            'tours.details'
        ])->get();

        return response()->json($tourPackages);
    }

    public function show($id)
    {
        $tourPackage = TourPackage::with([
            'images',
            'tours.details'
        ])->findOrFail($id);

        return response()->json($tourPackage);
    }

    public function store(Request $request)
    {

        $validated = $request->validate([
            'title' => 'required|string|max:40',
            'departure_city' => 'required|string|max:25',
            'arrival_city' => 'required|string|max:25',
            'description' => 'required',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:8192',
        ]);

        DB::beginTransaction();

        try {
            $data = $validated;
            $data['description'] = $request->input('description');

            if ($request->hasFile('main_image')) {
                $path = $request->file('main_image')->store('public/tour_packages/images');
                $data['main_image'] = Storage::url($path);

                $image = Image::make($request->file('main_image'));
                $thumbPath = 'public/tour_packages/thumbnails/' . $request->file('main_image')->hashName();
                $image->resize(64, 40, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $image->resizeCanvas(64, 40, 'center', false, null);
                $image->save(storage_path('app/' . $thumbPath));

                $data['main_image_thumbnail'] = Storage::url($thumbPath);
            }

            $tourPackage = TourPackage::create($data);

            if ($request->hasFile('gallery')) {
                foreach ($request->file('gallery') as $imageFile) {
                    $path = $imageFile->store('public/tour_packages/gallery');
                    TourPackageImage::create([
                        'tour_package_id' => $tourPackage->id,
                        'image_path' => Storage::url($path)
                    ]);
                }
            }

            $hotelImages = $request->file('hotel_images', []);
            if (!is_array($hotelImages)) {
                $hotelImages = [$hotelImages];
            }

            $toursData = json_decode($request->input('tours'), true);

            foreach ($toursData as $index => $tourData) {
                $tourData['tour_package_id'] = $tourPackage->id;

                if (isset($hotelImages[$index])) {
                    $hotelImagePath = $hotelImages[$index]->store('public/tours/hotels');
                    $tourData['hotel_image'] = Storage::url($hotelImagePath);
                }

                $details = $tourData['details'] ?? null;
                unset($tourData['details']);

                $tour = Tour::create($tourData);

                if ($details) {
                    $details['tour_id'] = $tour->id;
                    TourDetail::create($details);
                }
            }

            DB::commit();

            return response()->json($tourPackage->load(['images', 'tours.details']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Ошибка при создании турпакета', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => 'Ошибка сервера: ' . $e->getMessage()], 500);
        }
    }


    public function update(Request $request, $id)
    {

        Log::debug('Request data:', $request->all());
        Log::debug('Files:', $request->file() ? array_keys($request->file()) : ['no files']);
        Log::debug('Tours input:', ['tours' => $request->input('tours')]);

        $tourPackage = TourPackage::findOrFail($id);

        $validated = $request->validate([
            'title' => 'required|string|max:40',
            'departure_city' => 'required|string|max:25',
            'arrival_city' => 'required|string|max:25',
            'description' => 'required',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:8192',
        ]);

        DB::beginTransaction();
        try {
            $data = $validated;
            $data['description'] = $request->input('description');

            if ($request->hasFile('main_image')) {
                $path = $request->file('main_image')->store('public/tour_packages/images');
                $data['main_image'] = Storage::url($path);

                $image = Image::make($request->file('main_image'));
                $thumbPath = 'public/tour_packages/thumbnails/' . $request->file('main_image')->hashName();
                $image->resize(64, 40, function ($constraint) {
                    $constraint->aspectRatio();
                    $constraint->upsize();
                });
                $image->resizeCanvas(64, 40, 'center', false, null);
                $image->save(storage_path('app/' . $thumbPath));

                $data['main_image_thumbnail'] = Storage::url($thumbPath);
            }

            $tourPackage->update($data);

            $toursRaw = $request->input('tours');

            $tours = json_decode($toursRaw, true);
            if (!is_array($tours)) {
                return response()->json(['error' => 'Некорректный формат данных "tours"'], 422);
            }

            if (is_array($tours)) {
                foreach ($tours as $index => $tourData) {
                    if (isset($tourData['id'])) {
                        $tour = Tour::findOrFail($tourData['id']);

                        $details = $tourData['details'] ?? null;
                        unset($tourData['details']);

                        if ($request->hasFile("hotel_image_$index")) {
                            $hotelImagePath = $request->file("hotel_image_$index")->store('public/hotel_images');
                            $tourData['hotel_image'] = Storage::url($hotelImagePath);
                        }

                        $tour->update($tourData);

                        if ($details) {
                            if ($tour->details) {
                                $tour->details->update($details);
                            } else {
                                $details['tour_id'] = $tour->id;
                                TourDetail::create($details);
                            }
                        }
                    } else {
                        $details = $tourData['details'] ?? null;
                        unset($tourData['details']);

                        if ($request->hasFile("hotel_image_$index")) {
                            $hotelImagePath = $request->file("hotel_image_$index")->store('public/hotel_images');
                            $tourData['hotel_image'] = Storage::url($hotelImagePath);
                        }

                        $tourData['tour_package_id'] = $tourPackage->id;
                        $tour = Tour::create($tourData);

                        if ($details) {
                            $details['tour_id'] = $tour->id;
                            TourDetail::create($details);
                        }
                    }
                }

            }

            if ($request->hasFile('gallery')) {
                foreach ($request->file('gallery') as $imageFile) {
                    $path = $imageFile->store('public/tour_packages/gallery');
                    TourPackageImage::create([
                        'tour_package_id' => $tourPackage->id,
                        'image_path' => Storage::url($path)
                    ]);
                }
            }

            DB::commit();
            return response()->json($tourPackage->load(['images', 'tours.details']));
        } catch (\Exception $e) {
            DB::rollBack();
            Log::error('Ошибка при обновлении турпакета', [
                'message' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $tourPackage = TourPackage::findOrFail($id);
        $tourPackage->delete();
        return response()->json(['message' => 'Туристическая подборка удалена.']);
    }
}
