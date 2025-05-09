<?php

namespace App\Http\Controllers;

use App\Models\Certificate;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class CertificateController extends Controller
{
    public function index()
    {
        $certificates = Certificate::orderBy('created_at', 'desc')->get();
        return response()->json($certificates);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:75',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);
        $data = ['title' => $request->title];

        if ($request->hasFile('image')) {
            $path = $request->file('image')->store('public/certificates/images');
            $data['image'] = Storage::url($path);

            $image = Image::make($request->file('image'));
            $thumbnailPath = 'public/certificates/thumbnails/' . $request->file('image')->hashName();
            $image->resize(50, 35, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });

            $image->resizeCanvas(50, 35, 'center', false, null);
            $image->save(storage_path('app/' . $thumbnailPath));

            $data['thumbnail_image'] = Storage::url($thumbnailPath);
        }

        $certificate = Certificate::create($data);

        return response()->json($certificate, 201);
    }

    public function update(Request $request, $id)
    {
        $certificate = Certificate::findOrFail($id);
        $request->validate([
            'title' => 'required|string|max:75',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);

        $certificate->title = $request->title;

        if ($request->hasFile('image')) {
            // Удаление старых изображений
            if ($certificate->image) {
                Storage::delete(str_replace('/storage/', 'public/', $certificate->image));
            }
            if ($certificate->thumbnail_image) {
                Storage::delete(str_replace('/storage/', 'public/', $certificate->thumbnail_image));
            }

            // Сохранение нового изображения
            $path = $request->file('image')->store('public/certificates/images');
            $certificate->image = Storage::url($path);

            // Создание миниатюры
            $image = Image::make($request->file('image'));
            $thumbnailPath = 'public/certificates/thumbnails/' . $request->file('image')->hashName();
            $image->resize(50, 35, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $image->resizeCanvas(50, 35, 'center', false, null);
            $image->save(storage_path('app/' . $thumbnailPath));

            $certificate->thumbnail_image = Storage::url($thumbnailPath);
        }

        $certificate->save();

        return response()->json($certificate);
    }


/*
    public function update(Request $request, Certificate $certificate)
    {
        $request->validate([
            'title' => 'required|string|max:75',
            'image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);

        $certificate->title = $request->title;

        if ($request->hasFile('image')) {
            if ($certificate->image) {
                Storage::delete(str_replace('/storage/', 'public/', $certificate->image));
            }
            if ($certificate->thumbnail_image) {
                Storage::delete(str_replace('/storage/', 'public/', $certificate->thumbnail_image));
            }

            $path = $request->file('image')->store('public/certificates/images');
            $certificate->image = Storage::url($path);

            $image = Image::make($request->file('image'));
            $thumbnailPath = 'public/certificates/thumbnails/' . $request->file('image')->hashName();
            $image->resize(50, 35, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $image->resizeCanvas(50, 35, 'center', false, null);
            $image->save(storage_path('app/' . $thumbnailPath));

            $certificate->thumbnail_image = Storage::url($thumbnailPath);
        }

        $certificate->save();

        return response()->json($certificate);
    }
*/
    public function destroy($id)
    {
        $certificate = Certificate::find($id);

        if (!$certificate) {
            return response()->json(['message' => 'Сертификат не найден'], 404);
        }

        // Удаление файлов
        if ($certificate->image) {
            Storage::delete(str_replace('/storage/', 'public/', $certificate->image));
        }

        if ($certificate->thumbnail_image) {
            Storage::delete(str_replace('/storage/', 'public/', $certificate->thumbnail_image));
        }

        $certificate->delete();

        return response()->json(['message' => 'Сертификат успешно удален']);
    }
}
