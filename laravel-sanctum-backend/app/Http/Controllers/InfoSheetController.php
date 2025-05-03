<?php

namespace App\Http\Controllers;

use App\Models\InfoSheet;
use Illuminate\Http\Request;

class InfoSheetController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|array',
        ]);

        $sheet = InfoSheet::create([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json($sheet, 201);
    }
}
