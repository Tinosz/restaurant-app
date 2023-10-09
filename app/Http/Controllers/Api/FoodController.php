<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Food;
use App\Http\Requests\StoreFoodRequest;
use App\Http\Requests\UpdateFoodRequest;
use App\Http\Resources\FoodResource;
use Illuminate\Support\Facades\Storage;

class FoodController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $foods = Food::all();
        return response()->json($foods);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(StoreFoodRequest $request)
    {
        $data = $request->validated();
        
        if ($request->hasFile('food_image')) {
            $imagePath = $request->file('food_image')->store('food_images', 'public');
            $data['food_image'] = $imagePath;
        }
        $food = Food::create($data);
        return response(new FoodResource($food), 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Food $food)
    {
        return new FoodResource($food);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(UpdateFoodRequest $request, Food $food)
    {
        $data = $request->validated();

        if ($request->hasFile('food_image')) {
            Storage::delete([
                'public/' . $food->food_image,
                'public/storage' . $food->food_image
            ]);
            $imagePath = $request->file('food_image')->store('food_images', 'public');
            $data['food_image'] = $imagePath;
        }

        $food->update($data);

        return new FoodResource($food);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Food $food)
    {
        if ($food->food_image) {
            Storage::delete([
                'public/' . $food->food_image,
                'public/storage' . $food->food_image
            ]);
        }
    
        $food->delete();

        return response("", 204);
    }
}
