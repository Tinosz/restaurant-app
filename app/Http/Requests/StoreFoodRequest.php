<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFoodRequest extends FormRequest
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
        return [
            'food_name' => 'required|string|max:255',
            'food_image' => 'required|image|mimes:jpeg,png,jpg,svg|max:2048', 
            'food_type' => 'required|string|in:Food,Drink',
            'food_category' => 'required|string',
            'description' => 'required|string|max:280',
            'cost' => 'required|numeric',
        ];
    }
}
