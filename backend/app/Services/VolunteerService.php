<?php

namespace App\Services;

use App\Repositories\VolunteerRepository;
use Illuminate\Support\Facades\Storage;

class VolunteerService
{
    protected $repository;

    public function __construct(VolunteerRepository $repository)
    {
        $this->repository = $repository;
    }

    public function listVolunteers($params)
    {
        return $this->repository->getAll(
            $params['search'] ?? null,
            $params['status'] ?? null,
            $params['per_page'] ?? 10
        );
    }

    public function getVolunteer($id)
    {
        return $this->repository->findById($id);
    }

    public function createVolunteer(array $data)
    {
        if (isset($data['profile_image']) && !is_string($data['profile_image'])) {
            $data['profile_image'] = $this->uploadImage($data['profile_image']);
        }
        return $this->repository->create($data);
    }

    public function updateVolunteer($id, array $data)
    {
        $volunteer = $this->repository->findById($id);
        if (isset($data['profile_image']) && !is_string($data['profile_image'])) {
            if ($volunteer->profile_image) {
                Storage::disk('public')->delete($volunteer->profile_image);
            }
            $data['profile_image'] = $this->uploadImage($data['profile_image']);
        }
        return $this->repository->update($id, $data);
    }

    public function deleteVolunteer($id)
    {
        $volunteer = $this->repository->findById($id);
        if ($volunteer->profile_image) {
            Storage::disk('public')->delete($volunteer->profile_image);
        }
        return $this->repository->delete($id);
    }

    public function toggleVolunteerStatus($id)
    {
        return $this->repository->toggleStatus($id);
    }

    public function getDashboardStats()
    {
        return $this->repository->getStats();
    }

    private function uploadImage($file)
    {
        return $file->store('volunteers', 'public');
    }
}
