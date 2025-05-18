<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Application;
use App\Models\ApplicationDocument;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class ApplicationDocumentController extends Controller
{
    public function store(Request $request, $id)
    {
        $request->validate([
            'document' => 'required|file|max:10240',
        ]);

        $application = Application::findOrFail($id);
        $file = $request->file('document');

        $path = $file->store('application_documents', 'public');

        $document = $application->documents()->create([
            'file_path' => $path,
            'original_name' => $file->getClientOriginalName(),
        ]);
        Log::info('Document created:', $document->toArray());
        return response()->json([
            'document' => $document->fresh()
        ]);
    }

    public function destroy($id)
    {
        $document = ApplicationDocument::findOrFail($id);
        Storage::disk('public')->delete($document->file_path);
        $document->delete();

        return response()->json(['message' => 'Документ удалён']);
    }

    public function index($applicationId)
    {
        $documents = ApplicationDocument::where('application_id', $applicationId)->get();
        return response()->json($documents);
    }
}
