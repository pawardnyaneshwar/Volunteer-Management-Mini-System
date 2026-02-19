<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class VolunteerRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        $volunteerId = $this->route('volunteer');
        return [
            'name' => 'required|string|max:255',
            'email' => 'required|email|unique:volunteers,email,' . $volunteerId,
            'country_code' => 'required|string|max:10',
            'mobile' => 'required|string|max:20',
            'profile_image' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
            'status' => 'required|in:active,inactive',
        ];
    }
}
