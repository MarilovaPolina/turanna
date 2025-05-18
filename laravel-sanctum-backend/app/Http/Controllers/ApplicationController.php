<?php

namespace App\Http\Controllers;

use App\Models\Application;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class ApplicationController extends Controller
{
    public function index()
    {
        return Application::all();
    }

    /*
    public function show($id)
    {
        $application = Application::with('documents')->findOrFail($id);
        return response()->json($application);
    }*/

    public function show($id)
    {
        return Application::findOrFail($id);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'communication_method' => 'required|in:call,chat',
            'contacts' => 'required|string|max:255',
            'communication_time' => 'nullable|string|max:255',
            'direction' => 'nullable|string|max:255',
            'budget' => 'nullable|string|max:255',
            'notes' => 'nullable|string',
        ]);

        $validated['status'] = 'Новая';

        $application = Application::create($validated);

        return response()->json($application, 201);
    }

    public function destroy($id)
    {
        $application = Application::findOrFail($id);
        $application->delete();

        return response()->json(['message' => 'Заявка удалена']);
    }

    public function updateStatus(Request $request, $id)
    {
        $request->validate([
            'status' => 'required|string|max:255',
        ]);

        $application = Application::findOrFail($id);
        $application->status = $request->status;
        $application->save();

        return response()->json($application);
    }
}
