<?php

namespace App\Http\Controllers;

use App\Models\Article;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Intervention\Image\Facades\Image;

class ArticleController extends Controller
{
    public function index()
    {
        $articles = Article::orderBy('created_at', 'desc')->get();
        return response()->json($articles);
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:75',
            'content' => 'required',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);

        $articleData = [
            'title' => $request->title,
            'content' => $request->input('content'),
        ];

        if ($request->hasFile('main_image')) {
            // Сохранение основного изображения
            $path = $request->file('main_image')->store('public/articles/images');
            $articleData['main_image'] = Storage::url($path);

            // Создание миниатюры изображения
            $image = Image::make($request->file('main_image'));
            $thumbnailPath = 'public/articles/thumbnails/' . $request->file('main_image')->hashName();
            $image->resize(64, 40);
            $image->save(storage_path('app/' . $thumbnailPath));

            // Путь к миниатюре
            $articleData['thumbnail_image'] = Storage::url($thumbnailPath);
        }

        $article = Article::create($articleData);

        return response()->json($article, 201);
    }

    public function show($id)
    {
        $article = Article::findOrFail($id);
        return response()->json($article);
    }

    public function update(Request $request, $id)
    {
        $article = Article::findOrFail($id);

        $request->validate([
            'title' => 'sometimes|string|max:75',
            'content' => 'required',
            'main_image' => 'nullable|image|mimes:jpeg,png,jpg,svg|max:8192',
        ]);

        if ($request->has('title')) {
            $article->title = $request->title;
        }

        $article->content = $request->input('content');

        if ($request->hasFile('main_image')) {
            if ($article->main_image) {
                Storage::delete(str_replace('/storage/', 'public/', $article->main_image));
            }
            if ($article->thumbnail_image) {
                Storage::delete(str_replace('/storage/', 'public/', $article->thumbnail_image));
            }

            $path = $request->file('main_image')->store('public/articles/images');
            $article->main_image = Storage::url($path);

            $image = Image::make($request->file('main_image'));
            $thumbnailPath = 'public/articles/thumbnails/' . $request->file('main_image')->hashName();
            $image->resize(64, 40, function ($constraint) {
                $constraint->aspectRatio();
                $constraint->upsize();
            });
            $image->resizeCanvas(64, 40, 'center', false, null);
            $image->save(storage_path('app/' . $thumbnailPath));

            $article->thumbnail_image = Storage::url($thumbnailPath);
        }

        $article->save();

        return response()->json($article);
    }



    public function destroy($id)
    {
        $article = Article::findOrFail($id);

        if ($article->main_image) {
            $imagePath = str_replace('/storage', 'public', $article->main_image);
            Storage::delete($imagePath);
        }

        if ($article->thumbnail_image) {
            $thumbnailPath = str_replace('/storage', 'public', $article->thumbnail_image);
            Storage::delete($thumbnailPath);
        }

        $article->delete();

        return response()->json(null, 204);
    }
}
