<?php

namespace App\Http\Controllers;

use App\Models\Article;
use App\Models\TourPackage;
use Illuminate\Support\Facades\DB;

class PostsController extends Controller
{
    public function index()
    {
        $articles = Article::select('id', 'title', 'content', 'main_image', 'created_at')
            ->addSelect(DB::raw("'article' as type"))
            ->get();

        $tours = TourPackage::select('id', 'title', 'departure_city', 'arrival_city', 'created_at', 'main_image', 'description')
            ->with(['tours' => function ($query) {
                $query->select('id', 'tour_package_id', 'start_date', 'nights', 'price', 'arrival_country');
            }])
            ->get()
            ->map(function ($item) {
                $item->type = 'tour_package';
                return $item;
            });

        $combined = $articles->concat($tours)
            ->sortByDesc('created_at')
            ->values();

        return response()->json($combined);
    }
}
