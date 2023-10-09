<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class UpdateFoodRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        $rules = [
            'food_name' => 'required|string|max:255',
            'food_type' => 'required|string|in:Food,Drink',
            'description' => 'required|string|max:280',
            'cost' => 'required|numeric',
        ];
    
        if ($this->hasFile('food_image')) {
            $rules['food_image'] = 'image|mimes:jpeg,png,jpg,gif|max:2048';
        }
    
        return $rules;
    }
}
