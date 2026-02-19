<?php

namespace App\Repositories;

use App\Models\Volunteer;
use Illuminate\Support\Facades\DB;

class VolunteerRepository
{
    public function getAll($search = null, $status = null, $perPage = 10)
    {
        $query = Volunteer::query();

        if ($search) {
            $query->where(function($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                  ->orWhere('email', 'like', "%{$search}%")
                  ->orWhere('mobile', 'like', "%{$search}%");
            });
        }

        if ($status) {
            $query->where('status', $status);
        }

        return $query->latest()->paginate($perPage);
    }

    public function findById($id)
    {
        return Volunteer::findOrFail($id);
    }

    public function create(array $data)
    {
        return Volunteer::create($data);
    }

    public function update($id, array $data)
    {
        $volunteer = $this->findById($id);
        $volunteer->update($data);
        return $volunteer;
    }

    public function delete($id)
    {
        $volunteer = $this->findById($id);
        return $volunteer->delete();
    }

    public function toggleStatus($id)
    {
        $volunteer = $this->findById($id);
        $volunteer->status = $volunteer->status === 'active' ? 'inactive' : 'active';
        $volunteer->save();
        return $volunteer;
    }

    public function getStats()
    {
        return [
            'total' => Volunteer::count(),
            'active' => Volunteer::active()->count(),
            'inactive' => Volunteer::inactive()->count(),
        ];
    }
}
