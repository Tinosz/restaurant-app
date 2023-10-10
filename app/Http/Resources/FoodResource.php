<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FoodResource extends JsonResource
{
    public static $wrap = false;
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'food_name' => $this->food_name,
            'food_image' => $this->food_image,
            'food_type' => $this->food_type,
            'food_category' => $this->food_category,
            'description' => $this->description,
            'cost' => $this->cost
        ];
    }
}
