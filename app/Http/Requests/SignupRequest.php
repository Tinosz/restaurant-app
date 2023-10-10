<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class SignupRequest extends FormRequest
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
            'first_name' => 'required|string|max:36',
            'last_name' => 'required|string|max:36',
            'username' => 'required|string|max:36|unique:users,username',
            'email' => 'required|email|unique:users,email',
            'gender' => 'required|in:Male,Female',
            'date_of_birth' => 'required|date_format:Y-m-d',
            'password' => ['required', 'confirmed', 'string', 'min:8'],
        ];
    }
}
