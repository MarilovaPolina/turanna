<?php

namespace App\Http\Controllers;

use App\Models\TourPackage;
use App\Models\TourPackageImage;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class TourPackageImageController extends Controller
{
    public function index($tourPackageId)
    {
        $tourPackage = TourPackage::with('images')->findOrFail($tourPackageId);
        return response()->json($tourPackage->images);
    }

    public function store(Request $request, $tourPackageId)
    {
        $tourPackage = TourPackage::findOrFail($tourPackageId);

        $validated = $request->validate([
            'image' => 'required|image|mimes:jpeg,png,jpg|max:8192',
        ]);

        $path = $request->file('image')->store('public/tour_packages/gallery');
        $imagePath = Storage::url($path);

        $image = TourPackageImage::create([
            'tour_package_id' => $tourPackage->id,
            'image_path' => $imagePath,
        ]);

        return response()->json($image, 201);
    }

    public function destroy($id)
    {
        $image = TourPackageImage::findOrFail($id);

        $path = str_replace('/storage/', 'public/', $image->image_path);
        Storage::delete($path);

        $image->delete();

        return response()->json(['message' => 'Image deleted']);
    }
}
