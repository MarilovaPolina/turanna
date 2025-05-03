<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Str;

class ImageController extends Controller
{
    public function uploadByFile(Request $request)
    {
        $file = $request->file('image') ?? $request->file('file');

        if (!$file) {
            return response()->json(['success' => 0, 'message' => 'No file provided'], 400);
        }

        $path = $file->store('public/uploads');
        $url = Storage::url($path);

        return response()->json([
            'success' => 1,
            'file' => [
                'url' => asset($url),
            ]
        ]);
    }

}
