<?php

namespace App\Http\Controllers;

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
            'description' => 'required|array',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:8192',
        ]);

        DB::beginTransaction();

        try {
            $data = $validated;
            $data['description'] = json_encode($validated['description']);

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

            // Если есть изображения галереи
            if ($request->has('gallery')) {
                foreach ($request->gallery as $imageFile) {
                    $path = $imageFile->store('public/tour_packages/gallery');
                    TourPackageImage::create([
                        'tour_package_id' => $tourPackage->id,
                        'image_path' => Storage::url($path)
                    ]);
                }
            }

            // Если есть туры
            if ($request->has('tours')) {
                foreach ($request->tours as $tourData) {
                    $tourData['tour_package_id'] = $tourPackage->id;
                    $tour = Tour::create($tourData);

                    if (isset($tourData['details'])) {
                        $details = $tourData['details'];
                        $details['tour_id'] = $tour->id;
                        TourDetail::create($details);
                    }
                }
            }

            DB::commit();
            return response()->json($tourPackage->load(['images', 'tours.details']), 201);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function update(Request $request, $id)
    {
        $tourPackage = TourPackage::findOrFail($id);
        $validated = $request->validate([
            'title' => 'required|string|max:40',
            'departure_city' => 'required|string|max:25',
            'arrival_city' => 'required|string|max:25',
            'description' => 'required|array',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg|max:8192',
        ]);

        DB::beginTransaction();
        try {
            $data = $validated;
            $data['description'] = json_encode($validated['description']);

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

            // Обновление туров и деталей
            if ($request->has('tours')) {
                foreach ($request->tours as $tourData) {
                    if (isset($tourData['id'])) {
                        $tour = Tour::findOrFail($tourData['id']);
                        $tour->update($tourData);

                        if (isset($tourData['details'])) {
                            $details = $tourData['details'];
                            if ($tour->details) {
                                $tour->details->update($details);
                            } else {
                                $details['tour_id'] = $tour->id;
                                TourDetail::create($details);
                            }
                        }
                    } else {
                        $tourData['tour_package_id'] = $tourPackage->id;
                        $tour = Tour::create($tourData);
                        if (isset($tourData['details'])) {
                            $details = $tourData['details'];
                            $details['tour_id'] = $tour->id;
                            TourDetail::create($details);
                        }
                    }
                }
            }

            DB::commit();
            return response()->json($tourPackage->load(['images', 'tours.details']));
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }

    public function destroy($id)
    {
        $tourPackage = TourPackage::findOrFail($id);
        $tourPackage->delete();
        return response()->json(['message' => 'Tour package deleted']);
    }
}
