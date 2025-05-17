<?php

namespace App\Http\Controllers;

use App\Models\Partner;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class PartnerController extends Controller
{
    public function index()
    {
        return response()->json(Partner::orderBy('created_at', 'desc')->get());
    }
    public function show($id)
    {
        $partner = Partner::find($id);
        if (!$partner) {
            return response()->json(['message' => 'Партнёр не найден'], 404);
        }
        return response()->json($partner);
    }


    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|string|max:35',
            'link' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);

        $data = [
            'name' => $request->name,
            'link' => $request->link,
        ];

        if ($request->hasFile('logo')) {
            $path = $request->file('logo')->store('public/partners/logos');
            $data['logo'] = Storage::url($path);

            $image = Image::make($request->file('logo'));
            $thumbnailPath = 'public/partners/thumbnails/' . $request->file('logo')->hashName();
            $image->resize(80, 80, function ($c) {
                $c->aspectRatio();
                $c->upsize();
            })->resizeCanvas(80, 80, 'center', false, null);
            $image->save(storage_path('app/' . $thumbnailPath));

            $data['thumbnail_logo'] = Storage::url($thumbnailPath);
        }

        $partner = Partner::create($data);
        return response()->json($partner, 201);
    }

    public function update(Request $request, $id)
    {
        $partner = Partner::findOrFail($id);

        $request->validate([
            'name' => 'required|string|max:35',
            'link' => 'required|string',
            'logo' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);

        $partner->name = $request->name;
        $partner->link = $request->link;

        if ($request->hasFile('logo')) {
            if ($partner->logo) {
                Storage::delete(str_replace('/storage/', 'public/', $partner->logo));
            }
            if ($partner->thumbnail_logo) {
                Storage::delete(str_replace('/storage/', 'public/', $partner->thumbnail_logo));
            }

            $path = $request->file('logo')->store('public/partners/logos');
            $partner->logo = Storage::url($path);

            $image = Image::make($request->file('logo'));
            $thumbnailPath = 'public/partners/thumbnails/' . $request->file('logo')->hashName();
            $image->resize(80, 80, function ($c) {
                $c->aspectRatio();
                $c->upsize();
            })->resizeCanvas(80, 80, 'center', false, null);
            $image->save(storage_path('app/' . $thumbnailPath));

            $partner->thumbnail_logo = Storage::url($thumbnailPath);
        }

        $partner->save();
        return response()->json($partner);
    }

    public function destroy($id)
    {
        $partner = Partner::find($id);

        if (!$partner) {
            return response()->json(['message' => 'Партнёр не найден'], 404);
        }

        if ($partner->logo) {
            Storage::delete(str_replace('/storage/', 'public/', $partner->logo));
        }

        if ($partner->thumbnail_logo) {
            Storage::delete(str_replace('/storage/', 'public/', $partner->thumbnail_logo));
        }

        $partner->delete();
        return response()->json(['message' => 'Партнёр удалён']);
    }
}
