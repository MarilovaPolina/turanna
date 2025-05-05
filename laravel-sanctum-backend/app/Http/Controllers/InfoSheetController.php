<?php

namespace App\Http\Controllers;

use App\Models\InfoSheet;
use Illuminate\Http\Request;

class InfoSheetController extends Controller
{
    public function index()
    {
        return response()->json(InfoSheet::latest()->get());
    }

    public function destroy($id)
    {
        $infoSheet = InfoSheet::findOrFail($id);
        $infoSheet->delete();

        return response()->json(['message' => 'Справка удалена']);
    }

    public function update(Request $request, $id)
    {
        $request->validate([
            'title' => 'required|string',
            'content' => 'required|array',
        ]);

        $infoSheet = InfoSheet::findOrFail($id);
        $infoSheet->update([
            'title' => $request->title,
            'content' => $request->content,
        ]);

        return response()->json($infoSheet);
    }

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
