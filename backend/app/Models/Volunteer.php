<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Volunteer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'country_code',
        'mobile',
        'profile_image',
        'status',
    ];

    /**
     * Scope a query to only include active volunteers.
     */
    public function scopeActive($query)
    {
        return $query->where('status', 'active');
    }

    /**
     * Scope a query to only include inactive volunteers.
     */
    public function scopeInactive($query)
    {
        return $query->where('status', 'inactive');
    }
}
